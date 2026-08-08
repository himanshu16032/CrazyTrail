import asyncio
import json
import os
from urllib.parse import urlparse
from playwright.async_api import async_playwright

BASE_URL = "https://virlo.ai"
DOMAIN = urlparse(BASE_URL).netloc

OUTPUT_DIR = "cursor_site_blueprint"
SCREENSHOTS_DIR = os.path.join(OUTPUT_DIR, "screenshots")
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

# Seed Phase 1 product + marketing routes so the blueprint covers app surfaces
SEED_PATHS = [
    "/",
    "/pricing",
    "/features",
    "/solutions",
    "/resources",
    "/api",
    "/mcp",
    "/dashboard",
    "/orbit",
    "/tracking",
    "/niches",
    "/login",
    "/signup",
]

MAX_PAGES = 30

blueprint = {
    "domain": DOMAIN,
    "sitemap": [],
    "global_theme": {},
    "pages": []
}

visited_urls = set()


async def extract_advanced_page_structure(page):
    """Extracts nested layout hierarchy, CSS design tokens, icons, and CTAs."""
    return await page.evaluate('''() => {
        const computedRoot = getComputedStyle(document.documentElement);
        const cssVars = {};
        for (let sheet of document.styleSheets) {
            try {
                for (let rule of sheet.cssRules) {
                    if (rule.selectorText === ':root' || rule.selectorText === 'html') {
                        for (let prop of rule.style) {
                            if (prop.startsWith('--')) {
                                cssVars[prop] = rule.style.getPropertyValue(prop).trim();
                            }
                        }
                    }
                }
            } catch (e) {}
        }

        const getStyleSnapshot = (el) => {
            const s = window.getComputedStyle(el);
            return {
                display: s.display,
                flexDirection: s.flexDirection,
                gap: s.gap,
                padding: s.padding,
                margin: s.margin,
                backgroundColor: s.backgroundColor,
                backgroundImage: s.backgroundImage.includes('gradient') ? s.backgroundImage : 'none',
                textColor: s.color,
                fontSize: s.fontSize,
                fontWeight: s.fontWeight,
                borderRadius: s.borderRadius,
                boxShadow: s.boxShadow !== 'none' ? s.boxShadow : null,
                backdropFilter: s.backdropFilter !== 'none' ? s.backdropFilter : null
            };
        };

        const sections = [];
        const containerElements = document.querySelectorAll('header, nav, section, main, footer, [class*="card"], [class*="hero"]');

        containerElements.forEach((sec, idx) => {
            const items = [];
            sec.querySelectorAll('h1, h2, h3, h4, p, button, a').forEach(child => {
                const text = child.innerText.trim();
                if (text.length > 0) {
                    items.push({
                        tag: child.tagName.toLowerCase(),
                        text: text.slice(0, 500),
                        href: child.getAttribute('href') || null,
                        is_cta: ['button', 'a'].includes(child.tagName.toLowerCase()) && (child.classList.contains('btn') || child.tagName === 'BUTTON'),
                        style: getStyleSnapshot(child)
                    });
                }
            });

            const svgCount = sec.querySelectorAll('svg').length;

            if (items.length > 0) {
                sections.push({
                    section_index: idx,
                    tag: sec.tagName.toLowerCase(),
                    className: typeof sec.className === 'string' ? sec.className.slice(0, 200) : '',
                    layout_style: getStyleSnapshot(sec),
                    has_svg_icons: svgCount > 0,
                    icon_count: svgCount,
                    elements: items
                });
            }
        });

        return {
            css_vars: cssVars,
            sections: sections,
            title: document.title,
            h1: document.querySelector('h1')?.innerText?.trim() || null
        };
    }''')


async def crawl_and_build():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1440, "height": 900})

        urls_to_visit = [BASE_URL.rstrip("/") + path if path != "/" else BASE_URL for path in SEED_PATHS]

        while urls_to_visit and len(visited_urls) < MAX_PAGES:
            current_url = urls_to_visit.pop(0)
            # Normalize trailing slash variants
            normalized = current_url.rstrip("/") or BASE_URL
            if normalized in visited_urls or current_url in visited_urls:
                continue

            visited_urls.add(normalized)
            visited_urls.add(current_url)
            route_path = urlparse(current_url).path or "/"
            route_slug = route_path.strip("/").replace("/", "_") or "home"
            print(f"Processing route: {route_path} ({len(visited_urls)//2 + 1}/{MAX_PAGES})")

            page = await context.new_page()
            api_calls = []

            def handle_response(response):
                req_url = response.url
                if "/api/" in req_url or "application/json" in response.headers.get("content-type", ""):
                    parsed_api = urlparse(req_url)
                    api_calls.append({
                        "method": response.request.method,
                        "endpoint": parsed_api.path,
                        "status": response.status
                    })

            page.on("response", handle_response)

            try:
                await page.goto(current_url, wait_until="domcontentloaded", timeout=30000)
                await page.wait_for_timeout(2500)

                desktop_img_path = os.path.join(SCREENSHOTS_DIR, f"{route_slug}_desktop.png")
                await page.screenshot(path=desktop_img_path, full_page=True)

                await page.set_viewport_size({"width": 375, "height": 812})
                await page.wait_for_timeout(800)
                mobile_img_path = os.path.join(SCREENSHOTS_DIR, f"{route_slug}_mobile.png")
                await page.screenshot(path=mobile_img_path, full_page=True)

                await page.set_viewport_size({"width": 1440, "height": 900})
                extracted_data = await extract_advanced_page_structure(page)

                blueprint["sitemap"].append(route_path)
                blueprint["pages"].append({
                    "route": route_path,
                    "url": current_url,
                    "title": extracted_data.get("title"),
                    "h1": extracted_data.get("h1"),
                    "desktop_screenshot": f"screenshots/{route_slug}_desktop.png",
                    "mobile_screenshot": f"screenshots/{route_slug}_mobile.png",
                    "api_endpoints_called": api_calls,
                    "sections": extracted_data["sections"]
                })

                if extracted_data["css_vars"]:
                    blueprint["global_theme"].update(extracted_data["css_vars"])

                hrefs = await page.eval_on_selector_all("a[href]", "els => els.map(e => e.href)")
                for href in hrefs:
                    parsed_href = urlparse(href)
                    if parsed_href.netloc == DOMAIN:
                        clean = href.split("#")[0].split("?")[0].rstrip("/") or BASE_URL
                        if clean not in visited_urls and clean not in urls_to_visit:
                            if not any(clean.lower().endswith(ext) for ext in [".png", ".jpg", ".jpeg", ".svg", ".pdf", ".css", ".js", ".webp", ".gif"]):
                                # Skip deep blog/docs sprawl beyond seeded product surfaces once we have enough
                                path = urlparse(clean).path
                                if any(skip in path for skip in ["/blog/", "/docs/", "/changelog", "/careers", "/legal"]):
                                    continue
                                urls_to_visit.append(clean)

            except Exception as e:
                print(f"Failed to crawl {current_url}: {e}")
                blueprint["sitemap"].append(route_path)
                blueprint["pages"].append({
                    "route": route_path,
                    "url": current_url,
                    "error": str(e),
                    "sections": [],
                    "api_endpoints_called": []
                })

            await page.close()

        await browser.close()

        blueprint_file = os.path.join(OUTPUT_DIR, "site_blueprint.json")
        with open(blueprint_file, "w", encoding="utf-8") as f:
            json.dump(blueprint, f, indent=2, ensure_ascii=False)

        # Also symlink/copy reference at repo root for @site_blueprint.json convenience
        root_ref = "site_blueprint.json"
        with open(root_ref, "w", encoding="utf-8") as f:
            json.dump(blueprint, f, indent=2, ensure_ascii=False)

        print(f"\nBlueprint complete — {len(blueprint['pages'])} pages saved in '{OUTPUT_DIR}'")
        print(f"Sitemap: {blueprint['sitemap']}")


if __name__ == "__main__":
    asyncio.run(crawl_and_build())
