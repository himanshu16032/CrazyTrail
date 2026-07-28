export default function TrustBlock() {
  return (
    <aside className="mt-10 rounded-2xl border border-gray-100 bg-white p-5 md:p-6">
      <h2 className="font-heading font-bold text-lg text-dark mb-2">About CrazyTrail</h2>
      <p className="text-dark-light text-sm leading-relaxed mb-3">
        CrazyTrail is a free short-form trend product for Instagram and YouTube creators. Rising Reels and Shorts are scored with short-video LLMs — hooks, format fingerprints, caption motifs, and velocity — then filtered to the early viral window (typically 3–5 days before peak).
      </p>
      <p className="text-dark-light text-sm leading-relaxed mb-3">
        We publish our methodology publicly, refresh weekly Instagram trend notes, and keep core alerts free for individual creators. CrazyTrail is not a delivery or shipping service.
      </p>
      <p className="text-dark-light text-sm leading-relaxed">
        Questions or corrections: use the{' '}
        <a href="/#submit" className="text-primary font-semibold hover:underline">get started form</a>
        {' '}·{' '}
        <a href="/methodology" className="text-primary font-semibold hover:underline">methodology</a>
        {' '}·{' '}
        <a href="/feed.xml" className="text-primary font-semibold hover:underline">RSS feed</a>.
      </p>
    </aside>
  );
}
