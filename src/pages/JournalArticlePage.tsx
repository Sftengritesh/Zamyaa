import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar, Share2, ArrowRight } from 'lucide-react'
import { api } from '@/services/api'
import { seedArticles } from '@/data/journal'
import type { JournalArticle } from '@/types'

export default function JournalArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const [article, setArticle] = useState<JournalArticle | null>(() => {
    return seedArticles.find((a) => a.slug === slug || a.id === slug) || null
  })
  const [allArticles, setAllArticles] = useState<JournalArticle[]>(seedArticles)

  useEffect(() => {
    // Scroll to top on article switch
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Fetch live article
    if (slug) {
      api
        .get(`/journal/${slug}`)
        .then((res) => {
          if (res.data?.article) {
            setArticle(res.data.article)
          }
        })
        .catch(() => {
          // fallback to seed
          const found = seedArticles.find((a) => a.slug === slug || a.id === slug)
          if (found) setArticle(found)
        })

      api
        .get('/journal')
        .then((res) => {
          if (res.data?.articles?.length) {
            setAllArticles(res.data.articles)
          }
        })
        .catch(() => {})
    }
  }, [slug])

  if (!article) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 space-y-4 text-center">
        <h1 className="font-display text-3xl">Story Not Found</h1>
        <p className="text-neutral-500 font-body text-sm">
          The requested journal article could not be located in our archives.
        </p>
        <Link
          to="/journal"
          className="px-6 py-3 bg-black text-white text-xs uppercase tracking-widest font-semibold"
        >
          Return to Journal
        </Link>
      </div>
    )
  }

  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <article className="min-h-screen bg-white text-black font-body">
      {/* ── BREADCRUMB & BACK BAR ── */}
      <div className="border-b border-[#eee] py-4 px-6 md:px-16 bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-neutral-600 hover:text-black transition-colors"
          >
            <ArrowLeft size={14} /> Back to Journal
          </Link>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400">
            {article.category}
          </span>
        </div>
      </div>

      {/* ── ARTICLE HEADER ── */}
      <header className="max-w-4xl mx-auto px-6 md:px-8 pt-12 md:pt-20 pb-10 text-center space-y-6">
        <div className="inline-block px-3 py-1 border border-black/20 text-[10px] font-mono uppercase tracking-widest text-neutral-700">
          {article.category}
        </div>

        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-normal leading-tight text-neutral-950">
          {article.title}
        </h1>

        {article.subtitle && (
          <p className="font-serif italic text-lg sm:text-2xl text-neutral-600 max-w-2xl mx-auto">
            {article.subtitle}
          </p>
        )}

        <div className="flex items-center justify-center gap-4 text-xs font-mono uppercase tracking-wider text-neutral-500 pt-4 border-t border-[#eee] max-w-md mx-auto">
          <span>By {article.author}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {new Date(article.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {article.readTime}
          </span>
        </div>
      </header>

      {/* ── FEATURED HERO PHOTOGRAPH ── */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 mb-14">
        <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-neutral-100 border border-[#eee]">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="flex items-center justify-between pt-3 text-xs text-neutral-400 font-mono">
          <span>Jaipur Atelier Visual Archive</span>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-neutral-700 hover:text-black uppercase tracking-wider text-[11px] font-semibold cursor-pointer"
          >
            <Share2 size={13} /> Share Story
          </button>
        </div>
      </div>

      {/* ── ARTICLE RICH TEXT CONTENT ── */}
      <div className="max-w-3xl mx-auto px-6 md:px-8 space-y-8 leading-relaxed text-base sm:text-lg text-neutral-800">
        {/* Leading Pullquote */}
        <div className="p-8 border-l-2 border-black bg-[#FAF9F6] my-8">
          <p className="font-serif italic text-xl sm:text-2xl text-neutral-900 leading-snug">
            &ldquo;{article.excerpt}&rdquo;
          </p>
        </div>

        {/* Narrative Paragraphs */}
        <div className="space-y-6 text-neutral-700 font-body">
          {article.content.split('\n\n').map((paragraph, idx) => {
            const clean = paragraph.trim()
            if (!clean) return null

            if (clean.startsWith('### ')) {
              return (
                <h3
                  key={idx}
                  className="font-display text-2xl sm:text-3xl text-neutral-950 font-normal pt-6"
                >
                  {clean.replace('### ', '')}
                </h3>
              )
            }
            if (clean.startsWith('## ')) {
              return (
                <h2
                  key={idx}
                  className="font-display text-3xl sm:text-4xl text-neutral-950 font-normal pt-8"
                >
                  {clean.replace('## ', '')}
                </h2>
              )
            }
            if (clean.startsWith('# ')) {
              return null // Skip redundant title
            }

            return (
              <p key={idx} className="leading-relaxed">
                {clean}
              </p>
            )
          })}
        </div>

        {/* Additional Photographs Gallery */}
        {article.additionalImages && article.additionalImages.length > 0 && (
          <div className="py-10 space-y-6">
            <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 text-center">
              Campaign Plates &amp; Atelier Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {article.additionalImages.map((img, i) => (
                <div key={i} className="aspect-[4/5] overflow-hidden bg-neutral-100 border border-[#eee]">
                  <img
                    src={img}
                    alt={`${article.title} Detail ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="pt-8 border-t border-[#eee] flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase text-neutral-400 mr-2">Curated Tags:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 border border-[#eee] text-xs font-mono uppercase tracking-wider text-neutral-600 bg-neutral-50"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── RELATED STORIES SECTION ── */}
      <section className="border-t border-[#eee] mt-20 py-16 px-6 md:px-16 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex items-center justify-between pb-4 border-b border-[#eee]">
            <h3 className="font-display text-2xl sm:text-3xl text-neutral-950">
              Continue Reading
            </h3>
            <Link
              to="/journal"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold font-body text-black hover:underline"
            >
              All Stories <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((rel) => (
              <article key={rel.id} className="group border border-[#eee] bg-white p-5 space-y-4">
                <Link to={`/journal/${rel.slug}`} className="block aspect-[4/3] overflow-hidden bg-neutral-100">
                  <img
                    src={rel.coverImage}
                    alt={rel.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                    {rel.category}
                  </span>
                  <h4 className="font-display text-xl leading-snug group-hover:underline">
                    <Link to={`/journal/${rel.slug}`}>{rel.title}</Link>
                  </h4>
                  <p className="font-body text-xs text-neutral-600 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}

