import { Eye, Heart, Star, TrendingUp } from "lucide-react";

export const viewsData = [
  { day: "Mon", views: 2.1, prev: 1.4 },
  { day: "Tue", views: 3.8, prev: 2.1 },
  { day: "Wed", views: 2.9, prev: 1.8 },
  { day: "Thu", views: 5.2, prev: 3.1 },
  { day: "Fri", views: 4.7, prev: 2.8 },
  { day: "Sat", views: 6.3, prev: 3.9 },
  { day: "Sun", views: 8.1, prev: 4.7 },
];

export const engagementData = [
  { hour: "0h", rate: 3.2 },
  { hour: "3h", rate: 2.1 },
  { hour: "6h", rate: 4.5 },
  { hour: "9h", rate: 7.8 },
  { hour: "12h", rate: 9.2 },
  { hour: "15h", rate: 8.6 },
  { hour: "18h", rate: 11.4 },
  { hour: "21h", rate: 8.9 },
];

export const topCreators = [
  { name: "@maya_creates", platform: "TikTok", followers: "2.4M", growth: "+12.3%", views: "48.2M" },
  { name: "@techreviews_jk", platform: "YouTube", followers: "891K", growth: "+8.7%", views: "22.1M" },
  { name: "@fitlife_anna", platform: "Reels", followers: "1.1M", growth: "+21.5%", views: "31.8M" },
  { name: "@cookwithme_raj", platform: "TikTok", followers: "645K", growth: "+15.2%", views: "18.9M" },
  { name: "@urbanstyle_lu", platform: "Reels", followers: "3.2M", growth: "+6.1%", views: "67.3M" },
];

export const platformBadge: Record<string, string> = {
  TikTok: "bg-red-500/10 text-red-600 border-red-500/20",
  YouTube: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Reels: "bg-amber-500/10 text-amber-600 border-amber-500/20",
};

export const tooltipStyle = {
  background: "#0d0d1c",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "8px",
  fontSize: "12px",
  color: "#eeeef8",
};

export const dashboardKpis = [
  { label: "Total Views", value: "248.4M", change: "+23.7%", icon: Eye, color: "#4285f4" },
  { label: "Avg. Engagement", value: "8.4%", change: "+1.2pp", icon: Heart, color: "#ea4335" },
  { label: "Creators Tracked", value: "1,247", change: "+48 this wk", icon: Star, color: "#fbbc04" },
  { label: "Viral Videos", value: "342", change: "+89 this wk", icon: TrendingUp, color: "#34a853" },
];

export const nicheThumbnails: Record<string, string> = {
  fitness: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=220&fit=crop&auto=format",
  food: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=220&fit=crop&auto=format",
  travel: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=220&fit=crop&auto=format",
  beauty: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=220&fit=crop&auto=format",
  tech: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=220&fit=crop&auto=format",
  finance: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=220&fit=crop&auto=format",
  fashion: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=220&fit=crop&auto=format",
  gaming: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&h=220&fit=crop&auto=format",
  wellness: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=220&fit=crop&auto=format",
  comedy: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&h=220&fit=crop&auto=format",
};

export const nicheHashtags: Record<string, string[]> = {
  fitness: ["#gymtok", "#fitnessmotivation", "#workoutroutine", "#12330"],
  finance: ["#moneytok", "#personalfinance", "#investing", "#fintok"],
  beauty: ["#skincare", "#makeuptutorial", "#glassskin", "#beautyhacks"],
  food: ["#foodtok", "#easyrecipes", "#cooking", "#mealprep"],
  travel: ["#traveltok", "#budgettravel", "#wanderlust", "#packingtips"],
  tech: ["#techtok", "#gadgets", "#aitools", "#productivity"],
  fashion: ["#outfitinspo", "#capsulewardrobe", "#thriftflip", "#styletips"],
  gaming: ["#gamingclips", "#speedrun", "#clutch", "#indiegames"],
  wellness: ["#mentalhealth", "#mindfulness", "#sleeptips", "#selfcare"],
  comedy: ["#comedyskit", "#pov", "#relatable", "#funny"],
};

export type VideoEmotion = {
  label: string;
  tone: "coral" | "cyan" | "amber" | "violet" | "mint" | "rose";
};

export type VideoResult = {
  id: number;
  niche: string;
  platform: "TikTok" | "YouTube" | "Reels";
  creator: string;
  title: string;
  views: number;
  likes: number;
  shares: number;
  engagement: number;
  growth: number;
  daysAgo: number;
  followers: number;
  duration: string;
  potentialScore: number;
  viralScore: number;
  hooks: string[];
  commentAnalysis: string;
  newIdea: string;
  emotion: VideoEmotion;
};

type Insight = Pick<
  VideoResult,
  "potentialScore" | "viralScore" | "hooks" | "commentAnalysis" | "newIdea" | "emotion"
>;

const videoInsights: Record<number, Insight> = {
  1: { potentialScore: 8, viralScore: 9, hooks: ["This routine broke the internet — here's why", "12 minutes. 3 incline. 30 days.", "Stop running harder. Run smarter."], commentAnalysis: "Viewers ask for beginner mods and shoe recs. High save intent; many say they'll try tomorrow morning.", newIdea: "Film a 7-day beginner version with before/after stamina clips and a printable tracker.", emotion: { label: "Excitement", tone: "coral" } },
  2: { potentialScore: 7, viralScore: 7, hooks: ["3 cues. One fixed back.", "Your deadlift pain isn't weakness", "Stop rounding — do this instead"], commentAnalysis: "Physio comments praise form tips. Requests for squat and bench versions dominate replies.", newIdea: "Series: '3 cues that fixed…' for squat, OHP, and RDL with form overlays.", emotion: { label: "Pride", tone: "amber" } },
  3: { potentialScore: 5, viralScore: 6, hooks: ["I trained like a Navy SEAL for 30 days", "Day 1 almost broke me", "What actually changed"], commentAnalysis: "Skepticism about sustainability; people want a realistic civilian schedule.", newIdea: "Make a 'SEAL lite' 20-min weekday plan for busy parents.", emotion: { label: "Surprise", tone: "cyan" } },
  4: { potentialScore: 9, viralScore: 5, hooks: ["Do this before you get out of bed", "Stiff mornings? 90 seconds.", "Mobility you can do under the covers"], commentAnalysis: "Huge thank-you energy from desk workers and seniors. Asks for evening wind-down version.", newIdea: "Evening 'in bed' unwind flow + sleep score tracking CTA.", emotion: { label: "Relief", tone: "mint" } },
  5: { potentialScore: 6, viralScore: 8, hooks: ["Your emergency fund is losing you money", "Cash under the mattress? Worse.", "Park it here instead"], commentAnalysis: "Debate on HYSA vs T-bills. Beginners request a step-by-step account setup.", newIdea: "Screen-record opening a HYSA in 60 seconds with real APY numbers.", emotion: { label: "Curiosity", tone: "cyan" } },
  6: { potentialScore: 7, viralScore: 7, hooks: ["I tracked every dollar for a year", "The shocking category wasn't coffee", "Year one money diary"], commentAnalysis: "People want the spreadsheet template and weekly check-in format.", newIdea: "Drop a free Notion/Sheets tracker and a 'week 1 only' challenge.", emotion: { label: "Surprise", tone: "cyan" } },
  7: { potentialScore: 4, viralScore: 5, hooks: ["The 4% rule in 30 seconds", "Can you retire on this?", "Simple math, big decision"], commentAnalysis: "Comments argue inflation adjustments; ask for FIRE calculators.", newIdea: "Follow-up: '4% rule fails when…' with 3 real scenarios.", emotion: { label: "Realization", tone: "violet" } },
  8: { potentialScore: 9, viralScore: 4, hooks: ["One phone call fixed my score", "Credit tip banks won't tell you", "Do this before you apply"], commentAnalysis: "High intent but wary of scams — want exact script and which bureau to call.", newIdea: "Post the exact phone script + goodwill letter template.", emotion: { label: "Hope", tone: "mint" } },
  9: { potentialScore: 6, viralScore: 9, hooks: ["Dermatologists love this 5-minute routine", "Glass skin without 12 steps", "Morning glow, no fluff"], commentAnalysis: "Product link requests flood comments. Sensitive-skin variants asked for.", newIdea: "Sensitive-skin glass routine under $25 with drugstore only.", emotion: { label: "Admiration", tone: "violet" } },
  10: { potentialScore: 7, viralScore: 8, hooks: ["$12 that beats $80 foundation", "Drugstore vs luxury — blind test", "Stop overpaying for base"], commentAnalysis: "Shade-match questions and oily vs dry skin splits. Strong dupe demand.", newIdea: "Shade-match guide by undertone with side-by-side clips.", emotion: { label: "Satisfaction", tone: "amber" } },
  11: { potentialScore: 5, viralScore: 6, hooks: ["Retinol mistakes aging you faster", "You're using it wrong", "Night routine red flags"], commentAnalysis: "Fearful tone; people ask for beginner strength and sandwich method.", newIdea: "Retinol starter week plan with irritation rescue tips.", emotion: { label: "Concern", tone: "rose" } },
  12: { potentialScore: 8, viralScore: 6, hooks: ["Heatless curls that actually hold", "No heat. Still bouncy.", "Overnight method that works"], commentAnalysis: "Hair-type specific asks (fine, curly, short). Tutorial speed too fast for some.", newIdea: "Split videos for fine vs thick hair with slower demos.", emotion: { label: "Joy", tone: "coral" } },
  13: { potentialScore: 5, viralScore: 10, hooks: ["Butter chicken in one pan", "Under 20 minutes. Restaurant taste.", "Weeknight curry, no stress"], commentAnalysis: "Spice-level and substitute questions. 'Make it vegan' keeps repeating.", newIdea: "Vegan one-pan butter 'chicken' + grocery list sticker.", emotion: { label: "Desire", tone: "coral" } },
  14: { potentialScore: 6, viralScore: 7, hooks: ["Carbonara without cream — the real way", "Restaurant secret, home kitchen", "Eggs + pasta water. That's it."], commentAnalysis: "People failed on egg scramble — want slow-mo emulsify step.", newIdea: "Fail-proof carbonara with thermometer cues and slow-mo.", emotion: { label: "Satisfaction", tone: "amber" } },
  15: { potentialScore: 7, viralScore: 6, hooks: ["Sourdough for people who always fail", "Your starter isn't dead", "Bread that finally rises"], commentAnalysis: "Beginner anxiety high; want oven-only no Dutch oven method.", newIdea: "Apartment oven sourdough — no Dutch oven challenge.", emotion: { label: "Relief", tone: "mint" } },
  16: { potentialScore: 8, viralScore: 5, hooks: ["5 lunches. $22 total.", "Meal prep that doesn't taste sad", "Grocery haul → full week"], commentAnalysis: "Macros and kid-friendly swaps requested. Template shopping list wanted.", newIdea: "Printable $22 meal-prep grocery card + 15-min assembly reel.", emotion: { label: "Approval", tone: "mint" } },
  17: { potentialScore: 6, viralScore: 9, hooks: ["Japan on $40 a day", "Full breakdown, no fluff", "Where the money actually goes"], commentAnalysis: "City vs countryside budget splits; transit pass questions dominate.", newIdea: "Tokyo-only $40 day vs Osaka-only comparison series.", emotion: { label: "Amazement", tone: "cyan" } },
  18: { potentialScore: 7, viralScore: 7, hooks: ["2 weeks. One backpack.", "No checked bag. No stress.", "Packing cubes changed everything"], commentAnalysis: "Climate-specific lists requested (cold Europe, humid SEA).", newIdea: "Seasonal packing cubes: winter Europe vs tropical Asia.", emotion: { label: "Relief", tone: "mint" } },
  19: { potentialScore: 5, viralScore: 5, hooks: ["Cheapest way across Europe by train", "Skip the flights", "Rail pass math explained"], commentAnalysis: "Bookings confusion; want exact site names and youth discounts.", newIdea: "Screen-record booking a 3-country rail itinerary live.", emotion: { label: "Curiosity", tone: "cyan" } },
  20: { potentialScore: 9, viralScore: 4, hooks: ["Greek islands with no crowds", "Skip Santorini. Go here.", "Quiet beaches, same water"], commentAnalysis: "Ferry logistics and May vs September timing asked a lot.", newIdea: "3 underrated islands with ferry map + hotel budget tiers.", emotion: { label: "Love", tone: "rose" } },
  21: { potentialScore: 4, viralScore: 9, hooks: ["$200 laptop vs MacBook Air", "I didn't expect this", "Benchmark that shocked me"], commentAnalysis: "Use-case splits: students vs creators. Battery life skepticism.", newIdea: "Student day-in-the-life test: lectures, Canva, Zoom only.", emotion: { label: "Surprise", tone: "cyan" } },
  22: { potentialScore: 7, viralScore: 9, hooks: ["5 AI tools replaced my workflow", "I fired my old stack", "Save 10 hours a week"], commentAnalysis: "Pricing and privacy concerns; want free-tier alternatives.", newIdea: "Free-only AI workflow for students under $0/month.", emotion: { label: "Excitement", tone: "coral" } },
  23: { potentialScore: 6, viralScore: 6, hooks: ["Portfolio site in one evening", "No code degree needed", "Hire-ready by midnight"], commentAnalysis: "Template links requested; deploy anxiety on GitHub Pages/Vercel.", newIdea: "Exact Figma → Webflow/Framer path with deploy checklist.", emotion: { label: "Optimism", tone: "amber" } },
  24: { potentialScore: 8, viralScore: 3, hooks: ["What's inside a $12 smartwatch?", "Teardown you didn't expect", "Cheap tech, wild guts"], commentAnalysis: "Nerdy delight; asks for more budget teardowns.", newIdea: "Series: tear down $10 earbuds, $15 power bank, $20 tracker.", emotion: { label: "Curiosity", tone: "cyan" } },
  25: { potentialScore: 5, viralScore: 9, hooks: ["12 pieces. 30 outfits.", "Capsule that actually works", "Stop buying more clothes"], commentAnalysis: "Size-inclusive and climate variants requested heavily.", newIdea: "Plus-size capsule and hot-climate capsule spin-offs.", emotion: { label: "Admiration", tone: "violet" } },
  26: { potentialScore: 8, viralScore: 8, hooks: ["$6 thrift find → runway jacket", "Before and after flip", "Thrift math that hits"], commentAnalysis: "Want sewing difficulty rating and tools list.", newIdea: "Beginner thrift flip under 30 minutes, no sewing machine.", emotion: { label: "Admiration", tone: "violet" } },
  27: { potentialScore: 6, viralScore: 5, hooks: ["Dress well on a real budget", "Style ≠ expensive", "3 rules I follow"], commentAnalysis: "Men vs women wardrobe splits; color season questions.", newIdea: "Budget wardrobe by color season with $50 challenge.", emotion: { label: "Approval", tone: "mint" } },
  28: { potentialScore: 7, viralScore: 4, hooks: ["Every sneaker silhouette explained", "Know what you're buying", "Shape guide in 40 seconds"], commentAnalysis: "Collectors want price tiers and fake-spotting tips.", newIdea: "Silhouette + 'how to spot fakes' combo carousel.", emotion: { label: "Interest", tone: "cyan" } },
  29: { potentialScore: 3, viralScore: 10, hooks: ["1v5 clutch that ended it", "Watch the last 8 seconds", "Tournament moment"], commentAnalysis: "Hype comments; want POV + coach breakdown of decision-making.", newIdea: "Slow-mo clutch breakdown with crosshair/heatmap overlay.", emotion: { label: "Excitement", tone: "coral" } },
  30: { potentialScore: 6, viralScore: 8, hooks: ["Beat the game without touching the ground", "Speedrun glitch explained", "Zero floor contact"], commentAnalysis: "Tutorial requests for the glitch; console vs PC differences.", newIdea: "Teach the glitch in 3 steps for beginners.", emotion: { label: "Amazement", tone: "cyan" } },
  31: { potentialScore: 8, viralScore: 5, hooks: ["Indie games that deserve players", "Hidden gems, not ads", "Your next favorite"], commentAnalysis: "Wishlist links and 'similar to X' recommendations wanted.", newIdea: "Weekly 3-indie drop with one-sentence pitch each.", emotion: { label: "Love", tone: "rose" } },
  32: { potentialScore: 9, viralScore: 3, hooks: ["Restoring a 1983 arcade cabinet", "Dust to game night", "Retro rescue"], commentAnalysis: "Parts sourcing and cost breakdown asked repeatedly.", newIdea: "Cost diary series: week-by-week restore budget.", emotion: { label: "Nostalgia", tone: "violet" } },
  33: { potentialScore: 7, viralScore: 9, hooks: ["Breathing that stops a panic spiral", "Box breathing, but better", "Calm in 4 counts"], commentAnalysis: "People say it helped in real time. Want audio-only version.", newIdea: "Audio-guided 60s calm track for Stories/Reels.", emotion: { label: "Comfort", tone: "mint" } },
  34: { potentialScore: 6, viralScore: 7, hooks: ["Why you wake up at 3am", "It's not random", "Fix your cortisol curve"], commentAnalysis: "Mixed science debate; ask for doctor-backed tips and caffeine cutoff.", newIdea: "3am wake protocol: light, temp, and evening caffeine rules.", emotion: { label: "Concern", tone: "rose" } },
  35: { potentialScore: 7, viralScore: 5, hooks: ["10-minute reset for burnout", "When your brain is fried", "Soft reset, not hustle"], commentAnalysis: "Work-from-home audience; want desk-safe version without lying down.", newIdea: "Desk burnout reset — seated only, camera-off friendly.", emotion: { label: "Relief", tone: "mint" } },
  36: { potentialScore: 9, viralScore: 3, hooks: ["3 prompts that changed how I think", "Journal differently", "Questions > pages"], commentAnalysis: "Want printable card and morning vs night prompts.", newIdea: "Printable prompt pack + 7-day streak challenge.", emotion: { label: "Reflection", tone: "violet" } },
  37: { potentialScore: 4, viralScore: 10, hooks: ["POV: group chat plans a trip", "Nobody books anything", "The chaos is real"], commentAnalysis: "Duet and stitch storm; people tag their chaotic friends.", newIdea: "Part 2: group chat actually books — still chaos.", emotion: { label: "Amusement", tone: "coral" } },
  38: { potentialScore: 5, viralScore: 8, hooks: ["This meeting should've been an email", "Corporate bingo live", "Mute yourself, please"], commentAnalysis: "Office workers relate hard; want printable bingo card.", newIdea: "Meeting bingo printable + manager-safe version.", emotion: { label: "Amusement", tone: "coral" } },
  39: { potentialScore: 7, viralScore: 6, hooks: ["Bad stock photos. Real life.", "We recreated them", "Cringe, but art"], commentAnalysis: "Want behind-the-scenes and more industries (dentist, startup).", newIdea: "Industry pack: recreate startup, gym, and dentist stock photos.", emotion: { label: "Amusement", tone: "coral" } },
  40: { potentialScore: 8, viralScore: 2, hooks: ["Rating dad jokes out of 10", "This one hurt", "Family comedy night"], commentAnalysis: "Wholesome replies; ask for mom jokes and kid reactions.", newIdea: "Dad vs kid joke battle — scorecards on screen.", emotion: { label: "Affection", tone: "rose" } },
};

const baseVideos = [
  { id: 1, niche: "fitness", platform: "TikTok" as const, creator: "@fitlife_anna", title: "The 12-3-30 treadmill routine that broke the internet", views: 5400000, likes: 612000, shares: 88000, engagement: 11.3, growth: 284, daysAgo: 2, followers: 1100000, duration: "0:42" },
  { id: 2, niche: "fitness", platform: "Reels" as const, creator: "@ironmike_lifts", title: "3 deadlift cues that fixed my lower back pain", views: 1820000, likes: 204000, shares: 31000, engagement: 9.1, growth: 112, daysAgo: 5, followers: 486000, duration: "0:58" },
  { id: 3, niche: "fitness", platform: "YouTube" as const, creator: "@homegym_dave", title: "I trained like a Navy SEAL for 30 days", views: 940000, likes: 87000, shares: 12400, engagement: 7.4, growth: 46, daysAgo: 11, followers: 312000, duration: "0:51" },
  { id: 4, niche: "fitness", platform: "TikTok" as const, creator: "@yogaflow_kim", title: "Morning mobility flow you can do in bed", views: 268000, likes: 41000, shares: 9800, engagement: 12.8, growth: 67, daysAgo: 1, followers: 94000, duration: "0:36" },
  { id: 5, niche: "finance", platform: "YouTube" as const, creator: "@moneymind_raf", title: "Why your emergency fund is losing you money", views: 3100000, likes: 288000, shares: 54000, engagement: 8.9, growth: 156, daysAgo: 4, followers: 842000, duration: "1:02" },
  { id: 6, niche: "finance", platform: "TikTok" as const, creator: "@budget_bex", title: "I tracked every dollar for a year — here's what happened", views: 1240000, likes: 176000, shares: 27500, engagement: 10.4, growth: 93, daysAgo: 7, followers: 368000, duration: "0:47" },
  { id: 7, niche: "finance", platform: "Reels" as const, creator: "@indexfund_ian", title: "The 4% rule explained in 30 seconds", views: 682000, likes: 74000, shares: 15200, engagement: 9.7, growth: 38, daysAgo: 14, followers: 215000, duration: "0:30" },
  { id: 8, niche: "finance", platform: "TikTok" as const, creator: "@creditscore_cj", title: "Fix your credit score with one phone call", views: 96000, likes: 12800, shares: 3100, engagement: 13.9, growth: 21, daysAgo: 20, followers: 52000, duration: "0:39" },
  { id: 9, niche: "beauty", platform: "Reels" as const, creator: "@glowbyzara", title: "The 5-minute glass skin routine dermatologists love", views: 4700000, likes: 528000, shares: 71000, engagement: 10.8, growth: 231, daysAgo: 3, followers: 1400000, duration: "0:44" },
  { id: 10, niche: "beauty", platform: "TikTok" as const, creator: "@makeup_by_noor", title: "Drugstore dupes that beat $80 foundation", views: 2260000, likes: 314000, shares: 48000, engagement: 12.1, growth: 148, daysAgo: 6, followers: 726000, duration: "0:53" },
  { id: 11, niche: "beauty", platform: "YouTube" as const, creator: "@skincare_science", title: "Retinol mistakes that are aging you faster", views: 780000, likes: 66000, shares: 11000, engagement: 7.1, growth: 34, daysAgo: 16, followers: 254000, duration: "1:08" },
  { id: 12, niche: "beauty", platform: "Reels" as const, creator: "@hairwith_tia", title: "Heatless curls that actually hold overnight", views: 415000, likes: 58000, shares: 14300, engagement: 13.2, growth: 79, daysAgo: 2, followers: 138000, duration: "0:33" },
  { id: 13, niche: "food", platform: "TikTok" as const, creator: "@cookwithme_raj", title: "One-pan butter chicken in under 20 minutes", views: 6100000, likes: 704000, shares: 132000, engagement: 12.4, growth: 312, daysAgo: 1, followers: 645000, duration: "0:49" },
  { id: 14, niche: "food", platform: "Reels" as const, creator: "@pastanight_gio", title: "Restaurant carbonara without the cream", views: 1930000, likes: 221000, shares: 39000, engagement: 10.2, growth: 124, daysAgo: 8, followers: 512000, duration: "0:41" },
  { id: 15, niche: "food", platform: "YouTube" as const, creator: "@bakelab_sam", title: "Sourdough for people who always fail at sourdough", views: 1120000, likes: 98000, shares: 17800, engagement: 8.1, growth: 52, daysAgo: 12, followers: 396000, duration: "1:14" },
  { id: 16, niche: "food", platform: "TikTok" as const, creator: "@mealprep_mo", title: "5 lunches for the week, $22 total", views: 342000, likes: 47000, shares: 10600, engagement: 11.7, growth: 63, daysAgo: 4, followers: 121000, duration: "0:56" },
  { id: 17, niche: "travel", platform: "Reels" as const, creator: "@nomad_elle", title: "Japan on $40 a day — the full breakdown", views: 3800000, likes: 402000, shares: 96000, engagement: 10.6, growth: 198, daysAgo: 3, followers: 918000, duration: "0:59" },
  { id: 18, niche: "travel", platform: "TikTok" as const, creator: "@carryon_only", title: "Packing 2 weeks into a backpack, no checked bag", views: 1470000, likes: 168000, shares: 42000, engagement: 11.1, growth: 87, daysAgo: 9, followers: 434000, duration: "0:38" },
  { id: 19, niche: "travel", platform: "YouTube" as const, creator: "@slowtravel_ben", title: "The cheapest way to cross Europe by train", views: 610000, likes: 52000, shares: 9400, engagement: 6.9, growth: 29, daysAgo: 18, followers: 187000, duration: "1:21" },
  { id: 20, niche: "travel", platform: "Reels" as const, creator: "@islandhop_ava", title: "Underrated Greek islands with no crowds", views: 188000, likes: 24000, shares: 6100, engagement: 12.6, growth: 44, daysAgo: 5, followers: 76000, duration: "0:35" },
  { id: 21, niche: "tech", platform: "YouTube" as const, creator: "@techreviews_jk", title: "This $200 laptop outperforms a MacBook Air", views: 4200000, likes: 381000, shares: 62000, engagement: 8.4, growth: 176, daysAgo: 2, followers: 891000, duration: "1:04" },
  { id: 22, niche: "tech", platform: "TikTok" as const, creator: "@aitools_daily", title: "5 AI tools that replaced my whole workflow", views: 2840000, likes: 356000, shares: 89000, engagement: 13.4, growth: 264, daysAgo: 1, followers: 674000, duration: "0:46" },
  { id: 23, niche: "tech", platform: "Reels" as const, creator: "@codewith_sana", title: "Build a portfolio site in one evening", views: 720000, likes: 81000, shares: 16200, engagement: 9.8, growth: 58, daysAgo: 10, followers: 243000, duration: "0:52" },
  { id: 24, niche: "tech", platform: "YouTube" as const, creator: "@gadgetteardown", title: "What's actually inside a $12 smartwatch", views: 156000, likes: 14200, shares: 2900, engagement: 6.2, growth: 17, daysAgo: 22, followers: 68000, duration: "1:11" },
  { id: 25, niche: "fashion", platform: "Reels" as const, creator: "@urbanstyle_lu", title: "Capsule wardrobe: 12 pieces, 30 outfits", views: 5100000, likes: 574000, shares: 103000, engagement: 11.6, growth: 247, daysAgo: 4, followers: 3200000, duration: "0:48" },
  { id: 26, niche: "fashion", platform: "TikTok" as const, creator: "@thriftflip_ro", title: "$6 thrift find turned runway jacket", views: 2010000, likes: 268000, shares: 51000, engagement: 12.9, growth: 139, daysAgo: 6, followers: 588000, duration: "0:37" },
  { id: 27, niche: "fashion", platform: "YouTube" as const, creator: "@styling_101", title: "How to dress well on a real budget", views: 486000, likes: 41000, shares: 7300, engagement: 7.6, growth: 33, daysAgo: 15, followers: 164000, duration: "1:06" },
  { id: 28, niche: "fashion", platform: "Reels" as const, creator: "@sneakerlab_dee", title: "Every sneaker silhouette explained", views: 224000, likes: 29000, shares: 6800, engagement: 12.1, growth: 41, daysAgo: 7, followers: 89000, duration: "0:43" },
  { id: 29, niche: "gaming", platform: "TikTok" as const, creator: "@clutchplays_ky", title: "The 1v5 clutch that ended the tournament", views: 4900000, likes: 636000, shares: 118000, engagement: 14.2, growth: 296, daysAgo: 1, followers: 1250000, duration: "0:31" },
  { id: 30, niche: "gaming", platform: "YouTube" as const, creator: "@speedrun_theo", title: "Beating the game without touching the ground", views: 2380000, likes: 214000, shares: 36000, engagement: 8.8, growth: 121, daysAgo: 5, followers: 706000, duration: "1:18" },
  { id: 31, niche: "gaming", platform: "Reels" as const, creator: "@indiegems_pia", title: "Indie games that deserve way more players", views: 594000, likes: 68000, shares: 13400, engagement: 10.1, growth: 49, daysAgo: 13, followers: 198000, duration: "0:54" },
  { id: 32, niche: "gaming", platform: "TikTok" as const, creator: "@retroarcade_vic", title: "Restoring a 1983 arcade cabinet", views: 132000, likes: 18600, shares: 4200, engagement: 13.1, growth: 26, daysAgo: 19, followers: 61000, duration: "0:40" },
  { id: 33, niche: "wellness", platform: "Reels" as const, creator: "@calmwith_iris", title: "The breathing pattern that stops a panic spiral", views: 3400000, likes: 418000, shares: 94000, engagement: 12.7, growth: 213, daysAgo: 2, followers: 872000, duration: "0:34" },
  { id: 34, niche: "wellness", platform: "TikTok" as const, creator: "@sleepdoc_nate", title: "Why you wake up at 3am every night", views: 1650000, likes: 192000, shares: 38000, engagement: 10.9, growth: 104, daysAgo: 6, followers: 447000, duration: "0:45" },
  { id: 35, niche: "wellness", platform: "YouTube" as const, creator: "@mindful_mornings", title: "A 10-minute reset for burnout days", views: 528000, likes: 44000, shares: 8600, engagement: 7.2, growth: 31, daysAgo: 17, followers: 176000, duration: "1:09" },
  { id: 36, niche: "wellness", platform: "Reels" as const, creator: "@journal_with_em", title: "Three prompts that changed how I think", views: 74000, likes: 9800, shares: 2400, engagement: 12.2, growth: 15, daysAgo: 24, followers: 43000, duration: "0:29" },
  { id: 37, niche: "comedy", platform: "TikTok" as const, creator: "@maya_creates", title: "POV: your group chat plans a trip", views: 7200000, likes: 892000, shares: 184000, engagement: 14.8, growth: 341, daysAgo: 1, followers: 2400000, duration: "0:27" },
  { id: 38, niche: "comedy", platform: "Reels" as const, creator: "@officelife_sid", title: "Every meeting that should've been an email", views: 2540000, likes: 331000, shares: 72000, engagement: 13.6, growth: 167, daysAgo: 3, followers: 619000, duration: "0:50" },
  { id: 39, niche: "comedy", platform: "YouTube" as const, creator: "@sketchhouse", title: "We recreated bad stock photos in real life", views: 860000, likes: 79000, shares: 15800, engagement: 9.2, growth: 42, daysAgo: 12, followers: 288000, duration: "1:16" },
  { id: 40, niche: "comedy", platform: "TikTok" as const, creator: "@dadjokes_daily", title: "Rating my dad's jokes out of 10", views: 51000, likes: 7400, shares: 1900, engagement: 14.5, growth: 12, daysAgo: 26, followers: 38000, duration: "0:32" },
];

export const videoResults: VideoResult[] = baseVideos.map((v) => ({
  ...v,
  ...videoInsights[v.id],
}));

export function formatCount(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${Math.round(n / 1000)}K`;
  return `${n}`;
}

export function scoreColor(score: number): string {
  if (score >= 8) return "#34a853";
  if (score >= 5) return "#f9ab00";
  return "#80868b";
}

export function potentialColor(score: number): string {
  if (score >= 8) return "#1a73e8";
  if (score >= 5) return "#f9ab00";
  return "#80868b";
}

export function potentialLabel(score: number): string {
  if (score >= 8) return "High potential";
  if (score >= 5) return "Open lane";
  return "Saturated";
}

export function viralLabel(score: number): string {
  if (score >= 8) return "Hot";
  if (score >= 5) return "Rising";
  return "Quiet";
}

export const emotionTone: Record<
  VideoEmotion["tone"],
  { fg: string; bg: string }
> = {
  coral: { fg: "#c5221f", bg: "#fce8e6" },
  cyan: { fg: "#007b83", bg: "#e0f7fa" },
  amber: { fg: "#e37400", bg: "#fef7e0" },
  violet: { fg: "#7627bb", bg: "#f3e8fd" },
  mint: { fg: "#137333", bg: "#e6f4ea" },
  rose: { fg: "#c2185b", bg: "#fce4ec" },
};
