import { useState, useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, Clock, Calendar, Sparkles } from 'lucide-react'
import { api } from '@/services/api'
import { seedArticles, journalCategories } from '@/data/journal'
import type { JournalArticle } from '@/types'

export default function JournalPage() {
  const [articles, setArticles] = useState<JournalArticle[]>(seedArticles)
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || 'All Stories'

  // Fetch live articles from API with seed fallback
  useEffect(() => {
    api
      .get('/journal')
      .then((res) => {
        if (res.data?.articles?.length) {
          setArticles(res.data.articles)
        }
      })
      .catch(() => {
        // Fallback to static seed data
      })
  }, [])

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'All Stories') return articles
    return articles.filter(
      (a) => a.category.toLowerCase() === activeCategory.toLowerCase()
    )
  }, [articles, activeCategory])

  const featuredArticle = useMemo(() => {
    return articles.find((a) => a.isFeatured) || articles[0]
  }, [articles])

  const handleCategoryChange = (cat: string) => {
    const next = new URLSearchParams(searchParams)
    if (cat === 'All Stories') next.delete('category')
    else next.set('category', cat)
    setSearchParams(next)
  }

  return (
    <div className="min-h-screen bg-white text-black font-body">
      {/* ── EDITORIAL HEADER ── */}
      <section className="border-b border-[#eee] py-16 md:py-24 px-6 md:px-16 text-center bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-black/40" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.35em] text-neutral-500 font-semibold">
              ATELIER EDITORIAL · VOLUME 01
            </span>
            <span className="w-8 h-px bg-black/40" />
          </div>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-neutral-950">
            The Journal
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-neutral-600 max-w-xl mx-auto">
            &ldquo;Reflections on Indian craft, design philosophy, and the poetic world of Zamyaa.&rdquo;
          </p>
        </div>
      </section>

      {/* ── STICKY CATEGORIES FILTER BAR ── */}
      <nav
        aria-label="Journal Categories"
        className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-[#eee] py-3.5 px-6 md:px-16"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto select-none [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {journalCategories.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold font-body border transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-black text-white border-black'
                      : 'bg-transparent text-neutral-600 border-[#eee] hover:border-black hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
          <span className="text-xs font-mono tracking-wider text-neutral-400 hidden lg:inline shrink-0">
            {filteredArticles.length} Stories Published
          </span>
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 md:py-20 space-y-16">
        {/* FEATURED STORY HERO (Only shown when viewing All Stories) */}
        {activeCategory === 'All Stories' && featuredArticle && (
          <article className="border border-[#eee] overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Featured Image */}
              <div className="lg:col-span-7 aspect-[4/3] lg:aspect-auto relative overflow-hidden bg-neutral-100">
                <img
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles size={11} /> Featured Story
                </div>
              </div>

              {/* Featured Content Dossier */}
              <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-white">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                    <span className="font-semibold text-black">{featuredArticle.category}</span>
                    <span>·</span>
                    <span>{featuredArticle.readTime}</span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal leading-snug text-neutral-950">
                    <Link
                      to={`/journal/${featuredArticle.slug}`}
                      className="hover:underline"
                    >
                      {featuredArticle.title}
                    </Link>
                  </h2>

                  {featuredArticle.subtitle && (
                    <p className="font-serif italic text-base sm:text-lg text-neutral-600">
                      {featuredArticle.subtitle}
                    </p>
                  )}

                  <p className="font-body text-sm text-neutral-600 leading-relaxed pt-2">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-8 border-t border-[#eee] flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">
                    By {featuredArticle.author}
                  </span>
                  <Link
                    to={`/journal/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold font-body text-black group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Story</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* ── ARTICLES GRID ── */}
        <section>
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#eee]">
            <h2 className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-neutral-800">
              {activeCategory === 'All Stories' ? 'Latest Dispatches' : activeCategory}
            </h2>
            <span className="text-xs font-mono text-neutral-400">
              Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'Article' : 'Articles'}
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="py-20 text-center space-y-4 border border-[#eee] p-8">
              <p className="font-display text-2xl text-neutral-600">No stories currently in this category.</p>
              <button
                onClick={() => handleCategoryChange('All Stories')}
                className="px-6 py-3 bg-black text-white text-xs uppercase tracking-widest font-semibold font-body"
              >
                View All Stories
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="group flex flex-col justify-between border border-[#eee] bg-white transition-all duration-300 hover:shadow-sm"
                >
                  <div>
                    {/* Cover Photo */}
                    <Link
                      to={`/journal/${article.slug}`}
                      className="block aspect-[4/3] overflow-hidden bg-neutral-100 relative"
                    >
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest text-black">
                        {article.category}
                      </div>
                    </Link>

                    {/* Text Container */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {new Date(article.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} /> {article.readTime}
                        </span>
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl font-normal leading-snug text-neutral-950 group-hover:underline">
                        <Link to={`/journal/${article.slug}`}>{article.title}</Link>
                      </h3>

                      <p className="font-body text-xs sm:text-sm text-neutral-600 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Read Story Footer */}
                  <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-[#f3f3f3] mt-4">
                    <span className="text-[11px] font-mono text-neutral-400">
                      By {article.author}
                    </span>
                    <Link
                      to={`/journal/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold font-body text-black group-hover:translate-x-1 transition-transform"
                    >
                      <span>Read Story</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ── NEWSLETTER STRIP: THE ATELIER DISPATCH ── */}
        <section className="bg-black text-white p-8 sm:p-14 text-center space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400">
            THE INNER CIRCLE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-normal">
            Subscribe to The Atelier Dispatch
          </h2>
          <p className="font-body text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
            Thoughtful essays on craft, early preview access to seasonal lookbooks, and private studio invitations.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              alert('Thank you for subscribing to The Atelier Dispatch.')
            }}
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-4"
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-neutral-900 border border-neutral-700 text-xs font-body text-white placeholder-neutral-500 focus:outline-none focus:border-white"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-black text-xs uppercase tracking-widest font-semibold font-body hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}

