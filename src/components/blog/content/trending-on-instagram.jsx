import { Intro, Section, Sub, P, Bold, List, Callout, ComparisonTable, FAQ, TOC } from '../primitives';

export default function Article() {
  return (
    <>
      <Intro>
        Updated every Monday. This is the short, honest version of what is actually moving on Instagram this week &mdash; the Reels formats, hashtags, audios, and niche-specific signals that are still inside the early window. If you act on something here in the next 48 hours, you&rsquo;re still likely on the building side of the wave, not the crashing side.
      </Intro>

      <Callout tone="amber">
        <P>
          <Bold>This week&rsquo;s top trends &mdash; updated July 28, 2026.</Bold> Five trends below are still in the early window. Signals mix CrazyTrail short-video velocity with manual niche scanning. Want this in your inbox every Monday? <a href="/?ref=blog-weekly" className="text-primary font-semibold underline-offset-2 hover:underline">Try CrazyTrail free</a>. Also see <a href="/topics/free-viral-reels-ideas" className="text-primary font-semibold underline-offset-2 hover:underline">free viral Reels ideas</a>.
        </P>
      </Callout>

      <TOC
        items={[
          { id: 'this-week', label: 'This week\u2019s top trends (highlight box)' },
          { id: 'reels', label: 'Trending Reels formats' },
          { id: 'hashtags', label: 'Trending hashtags right now' },
          { id: 'audio', label: 'Trending audio this week' },
          { id: 'niches', label: 'Trending by niche' },
          { id: 'next-week', label: 'How to know next week\u2019s trends before everyone else' },
          { id: 'faq', label: 'FAQ' },
        ]}
      />

      <Section id="this-week" title="This week\u2019s top trends">
        <P>For each trend below: what it is, why it&rsquo;s rising, an angle you can adapt, and the realistic deadline before saturation kicks in.</P>

        <Callout tone="primary">
          <P><Bold>1. &ldquo;I tested ___ so you don&rsquo;t have to&rdquo; proof Reels.</Bold> Niche: cross-niche. Why rising: mid-size creators hitting disproportionate saves with before/after proof in under 20s. Angle: one claim, one test, one verdict. Act by: <Bold>Thursday</Bold>.</P>
        </Callout>
        <Callout tone="green">
          <P><Bold>2. &ldquo;Soft life reset&rdquo; desk / room resets.</Bold> Niche: lifestyle, work, study. Why rising: counter to hustle edits; lo-fi audio + one habit change. Angle: 15s tidy + one rule you actually keep. Act by: <Bold>Friday</Bold>.</P>
        </Callout>
        <Callout tone="pink">
          <P><Bold>3. Warm metal / chrome-mix styling.</Bold> Niche: fashion, beauty, interiors-adjacent. Why rising: Pinterest spillover into Reels OOTD formats. Angle: two pieces you already own + one add. Act by: <Bold>Sunday</Bold>.</P>
        </Callout>
        <Callout tone="amber">
          <P><Bold>4. &ldquo;High-protein under 10 minutes&rdquo; swaps.</Bold> Niche: fitness, food. Why rising: combined multi-million views on quick meal swaps this week. Angle: one recipe, three beats, no fluff. Act by: <Bold>Wednesday</Bold>.</P>
        </Callout>
        <Callout tone="primary">
          <P><Bold>5. &ldquo;If I were your ___ for a day&rdquo; expert POV.</Bold> Niche: coaching, finance, design, fitness. Why rising: format jumping niches with high comment intent. Angle: one specific mistake to stop. Act by: <Bold>Friday</Bold>.</P>
        </Callout>
      </Section>

      <Section id="reels" title="Trending Reels formats this week">
        <P>These are <em>format</em> trends, not topic trends. Think of them as containers you can pour your own niche content into.</P>
        <Sub>POV: &ldquo;you asked me, here&rsquo;s the actual answer&rdquo;</Sub>
        <P>What it looks like: a frustrated direct-to-camera open, then a tight three-beat answer. Working because the algorithm is favouring high-retention openings and this format buys you 2&ndash;3 seconds of curiosity. Adapt it: a fitness creator could do &ldquo;you hired a trainer &mdash; here&rsquo;s what they&rsquo;d actually tell you to stop doing.&rdquo;</P>
        <Sub>&ldquo;This or that&rdquo; comparison Reels</Sub>
        <P>Two options. One sentence each. A clear personal pick. Working because saves and shares are weighted heavily right now and this format triggers both. Adapt it: pick the two most-asked-about options in your niche this month.</P>
        <Sub>&ldquo;Day in my life but only the interesting parts&rdquo;</Sub>
        <P>Tight 20-second cut, no filler. Working because it&rsquo;s an antidote to the bloated &ldquo;day in my life&rdquo; format that&rsquo;s been around for years. Adapt it: cut your existing day-in-life draft to a third of its length.</P>
        <Sub>Stitched-together micro-tips</Sub>
        <P>Five 4-second clips, each one a single tip, fast-cut. Working in fitness, finance, and design specifically. Adapt it: put your five most-asked questions in a row, one beat each.</P>
      </Section>

      <Section id="hashtags" title="Trending hashtags on Instagram right now">
        <P>
          A note on hashtag math: &ldquo;high volume&rdquo; (5M+ posts) gives you broad reach but is hard to rank in. &ldquo;Rising&rdquo; (500k&ndash;5M, growing week-over-week) is where you actually want to live. The 30-tag spam strategy is dead &mdash; 3 to 5 well-picked tags consistently outperforms in 2026.
        </P>
        <ComparisonTable
          headers={['Hashtag', 'Est. posts', 'Status', 'Best niche', 'Use it?']}
          rows={[
            ['#slowproductivity', '420k', '\ud83d\udfe2 Early', 'Work / lifestyle', '\u2705 Yes'],
            ['#brutalisthome', '180k', '\ud83d\udfe2 Early', 'Home / interiors', '\u2705 Yes'],
            ['#fastingfriendly', '260k', '\ud83d\udfe2 Early', 'Fitness / health', '\u2705 Yes'],
            ['#povtrainer', '1.1M', '\ud83d\udfe1 Rising', 'Fitness / coaching', '\u2705 Yes'],
            ['#thisorthat', '4.2M', '\ud83d\udfe1 Rising', 'Cross-niche', 'Maybe \u2014 high competition'],
            ['#realestatehacks', '3.8M', '\ud83d\udfe1 Rising', 'Property / finance', '\u2705 Yes'],
            ['#cleangirl', '14M', '\ud83d\udd34 Saturated', 'Beauty', '\u274c Skip'],
            ['#aestheticvlog', '22M', '\ud83d\udd34 Saturated', 'Lifestyle', '\u274c Skip'],
          ]}
        />
        <P><Bold>How to find these yourself:</Bold> open Instagram &rarr; search your niche term &rarr; tap the Tags tab &rarr; sort by post count. The sweet spot is 200k&ndash;3M posts and visibly growing week to week.</P>
      </Section>

      <Section id="audio" title="Trending audio on Instagram this week">
        <P>Audio trends move fastest of all. The realistic window is 5&ndash;7 days. Anything past 2M Reels using a sound is functionally saturated &mdash; you&rsquo;ll be lost in the pile.</P>

        <Sub>1. &ldquo;Run It Up&rdquo; sped-up edit &mdash; aux mix</Sub>
        <P>Reels using this: ~310k. Why trending: low-key, energetic, works under text-heavy clips. Best for: lifestyle, fitness, money. Idea: a fast-cut weekly recap.</P>
        <Sub>2. Lo-fi Nina Simone re-cut</Sub>
        <P>Reels using this: ~180k. Why trending: the &ldquo;slow productivity&rdquo; mood is feeding it. Best for: writers, designers, students. Idea: a quiet desk shot with one-line text.</P>
        <Sub>3. Indie pop hook &mdash; &ldquo;tell me again&rdquo;</Sub>
        <P>Reels using this: ~95k. Why trending: just hit the early-window threshold from a few mid-size creators in fashion. Best for: fashion, beauty, OOTD. Idea: a 3-clip outfit reveal.</P>
        <Sub>4. Soft house remix &mdash; trending in coffee/cooking content</Sub>
        <P>Reels using this: ~420k. Why trending: pairs perfectly with smooth-cut food and process content. Best for: food, recipe, cafe. Idea: a single recipe step shown in three angles.</P>
        <Callout tone="primary"><P><Bold>How to find audio yourself:</Bold> open Instagram &rarr; Reels tab &rarr; tap the audio name on any growing Reel &rarr; check the Reel count. 50k&ndash;500k = sweet spot. Above 2M = late.</P></Callout>
      </Section>

      <Section id="niches" title="Trending by niche &mdash; what&rsquo;s hot in your category">
        <Sub>Fitness &amp; wellness</Sub>
        <List items={['&ldquo;Fasting-friendly snack&rdquo; alternatives \u2014 high crossover demand.', 'Mobility-first workouts (15 min, no equipment) \u2014 saves are trending.', '&ldquo;What I eat in a low-energy week&rdquo; (counter to performative diets).']} />
        <Sub>Fashion &amp; beauty</Sub>
        <List items={['Indie pop &ldquo;tell me again&rdquo; OOTD format (see audio above).', 'Brown-on-brown styling pulling away from cleanwashed white tones.', '&ldquo;3 ways to wear&rdquo; format making a comeback in capsule-wardrobe niches.']} />
        <Sub>Food &amp; recipes</Sub>
        <List items={['One-pan high-protein dinners \u2014 search and saves both rising.', 'Coffee equipment &ldquo;upgrade vs not worth it&rdquo; comparisons.', 'Filipino + Korean dessert mash-ups carrying over from TikTok.']} />
        <Sub>Travel</Sub>
        <List items={['Slow travel itineraries (one country, two weeks) outperforming bucket-list lists.', '&ldquo;Solo female travel safety&rdquo; explainers gaining sustained engagement.', 'Niche destinations: Albanian Riviera, Northern Vietnam, Faroe Islands.']} />
        <Sub>Tech &amp; AI</Sub>
        <List items={['&ldquo;What I actually use AI for as a [job]&rdquo; \u2014 specific roles only, not generic.', 'Productivity setups in 30 seconds, fast-cut.', '&ldquo;This took 3 hours, now it takes 3 minutes&rdquo; before/after demos.']} />
        <Sub>Motivation &amp; self-help</Sub>
        <List items={['&ldquo;Slow productivity&rdquo; framing (counter to hustle).', '&ldquo;The thing nobody tells you about [habit]&rdquo; explainers.', '90-day routine recaps with measurable outcomes.']} />
      </Section>

      <Section id="next-week" title="How to know next week&rsquo;s trends before everyone else">
        <P>
          The trends above are useful this week. Next week, you&rsquo;ll need to find new ones. There are two honest paths to staying ahead consistently &mdash; one is automated, the other is manual.
        </P>
        <Sub>The automated path</Sub>
        <P>
          <a href="/?ref=blog-weekly" className="text-primary font-semibold underline-offset-2 hover:underline">CrazyTrail</a> sends a weekly trend alert email for your specific niche. You set the niche once, drop in your email, and the next Monday you have a digest like this in your inbox &mdash; tailored to what you actually post about. It&rsquo;s free, no card required, no daily dashboard to babysit.
        </P>
        <Sub>The manual path (10 minutes a week)</Sub>
        <List
          ordered
          items={[
            'Open Reddit, sort your top 4 niche subs by &ldquo;Rising&rdquo;. 3 minutes.',
            'Open TikTok, type your niche keyword, watch the autocomplete + scroll the top 10 results. 3 minutes.',
            'Open Google Trends, country filter, &ldquo;Past 7 days&rdquo;, look at the &ldquo;Rising&rdquo; tab in your category. 2 minutes.',
            'Read the last 30 comments on the most recent post of one big creator in your niche. 2 minutes.',
          ]}
        />
        <P>That&rsquo;s 10 minutes for next week&rsquo;s ideas. Honestly &mdash; do whichever one you&rsquo;ll actually do consistently. Consistency beats cleverness here.</P>
      </Section>

      <Section id="faq" title="Frequently asked questions">
        <FAQ
          items={[
            {
              q: 'What is currently trending on Instagram?',
              a: 'See the &ldquo;This week&rsquo;s top trends&rdquo; section above. Five trends are still inside the early window as of this week. Beyond that, format trends, hashtags, audios, and per-niche topics are all covered in their own sections.',
            },
            {
              q: 'How do I find trending Instagram Reels formats?',
              a: 'Watch the Reels tab daily for 5 minutes. Tap the audio on any fast-growing Reel to see how many other creators have used it. Anything in the 50k&ndash;500k Reels range is early but already validated. Anything past 2M is past peak.',
            },
            {
              q: 'What hashtags are trending on Instagram this week?',
              a: 'See the table above. Updated weekly. The pattern: ignore tags above 10M posts, focus on the 200k&ndash;3M range with visible week-over-week growth.',
            },
            {
              q: 'How often do Instagram trends actually change?',
              a: 'Audio: 5&ndash;10 days. Topic trends: 1&ndash;2 weeks. Format trends: 4&ndash;8 weeks. Hashtag trends: roughly 1&ndash;3 weeks depending on niche. Check weekly to stay current; daily checking burns out and rarely buys real signal.',
            },
            {
              q: 'How do I get trending Instagram topics sent to me automatically?',
              a: 'CrazyTrail does exactly this. Set your niche, drop in your email, get a weekly digest of trends in your specific category &mdash; before they hit Explore. Free, no account required.',
            },
          ]}
        />
      </Section>
    </>
  );
}
