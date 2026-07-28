import { Link } from '../lib/router';

export default function NotFoundPage() {
  return (
    <main className="pt-28 pb-20 bg-cream min-h-screen">
      <div className="max-w-xl mx-auto px-4 text-center">
        <p className="text-primary font-semibold text-sm mb-2">404</p>
        <h1 className="font-heading font-900 text-3xl text-dark mb-3">Page not found</h1>
        <p className="text-dark-light mb-8">
          That URL does not exist. Try a topic guide, the blog, or get free short-form trend alerts.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="bg-primary text-white font-semibold px-4 py-2.5 rounded-xl">
            Home
          </Link>
          <Link to="/topics" className="bg-white border border-gray-100 text-dark font-semibold px-4 py-2.5 rounded-xl">
            Topics
          </Link>
          <Link to="/blog" className="bg-white border border-gray-100 text-dark font-semibold px-4 py-2.5 rounded-xl">
            Blog
          </Link>
          <Link to="/methodology" className="bg-white border border-gray-100 text-dark font-semibold px-4 py-2.5 rounded-xl">
            Methodology
          </Link>
        </div>
      </div>
    </main>
  );
}
