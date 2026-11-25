import { ArrowDownRight, Calendar, FileDown, ShieldCheck } from 'lucide-react'
import type { Translations } from '../i18n/translations'
import { BOOKLET_FILENAME, BOOKLET_URL } from '../utils/whatsapp'
import parkAlleyImg from '../assets/photos/park-alley.jpg'
import poolMountainsImg from '../assets/photos/pool-mountains.jpg'
import terraceViewImg from '../assets/photos/terrace-view.jpg'

interface HeroSectionProps {
  t: Translations
  onBookViewingClick: (context: string) => void
}

export function HeroSection({ t, onBookViewingClick }: HeroSectionProps) {
  return (
    <section
      id="top"
      className="relative min-h-[92vh] flex flex-col justify-between bg-[#141816] text-[#F6F4EF] overflow-hidden pt-24 sm:pt-28 pb-10 sm:pb-14"
    >
      {/* Background photograph with refined editorial dark wash */}
      <div className="absolute inset-0">
        <img
          src={parkAlleyImg}
          alt="Парк-аллея коттеджного городка Apple Village"
          className="w-full h-full object-cover object-center opacity-50 scale-[1.01]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111513]/95 via-[#141816]/80 to-[#141816]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141816] via-transparent to-[#141816]/60" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 my-auto py-8 lg:py-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Copy */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A96E]/35 bg-[#1B332A]/60 backdrop-blur-sm px-3.5 py-1.5 text-[11px] sm:text-xs tracking-[0.12em] uppercase text-[#E6D1A7]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
              <span>{t.hero.eyebrow}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.08] text-[#F6F4EF]">
              {t.hero.title}{' '}
              <span className="block text-[#D5B883] italic font-normal mt-1">
                {t.hero.titleAccent}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#E4DFD5]/85 leading-relaxed max-w-2xl font-light">
              {t.hero.subtitle}
            </p>

            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-1">
              <a
                href="#masterplan"
                data-track="hero_choose_cottage"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A96E] hover:bg-[#D8BB84] text-[#141816] font-semibold text-sm px-7 py-3.5 transition-all shadow-lg shadow-black/25"
              >
                <span>{t.hero.ctaChoose}</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => onBookViewingClick('hero_book_viewing')}
                data-track="hero_book_viewing"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/8 hover:bg-white/15 backdrop-blur-sm text-[#F6F4EF] font-medium text-sm px-7 py-3.5 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#D5B883]" />
                <span>{t.hero.ctaViewing}</span>
              </button>
            </div>

            {/* PDF Booklet Link */}
            <div className="pt-1">
              <a
                href={BOOKLET_URL}
                download={BOOKLET_FILENAME}
                target="_blank"
                rel="noopener noreferrer"
                data-track="pdf_download_hero"
                className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-[#D5B883] hover:text-[#F6F4EF] transition-colors group"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#C9A96E]/40 bg-[#C9A96E]/10 group-hover:bg-[#C9A96E]/20 transition-colors">
                  <FileDown className="w-4 h-4" />
                </span>
                <span className="underline underline-offset-4 decoration-[#C9A96E]/50 group-hover:decoration-[#F6F4EF]">
                  {t.hero.ctaBooklet}
                </span>
              </a>
            </div>
          </div>

          {/* Right Architectural Visual Composition */}
          <div className="lg:col-span-5 hidden sm:block">
            <div className="relative grid grid-cols-12 gap-3 items-end">
              <div className="col-span-7 rounded-2xl overflow-hidden border border-white/15 shadow-2xl shadow-black/40 aspect-[3/4]">
                <img
                  src={poolMountainsImg}
                  alt="Всесезонный отапливаемый бассейн 200 м² с видом на горы в Apple Village"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-5 space-y-3">
                <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl shadow-black/40 aspect-[3/4]">
                  <img
                    src={terraceViewImg}
                    alt="Терраса коттеджа 32 м² в Apple Village"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl border border-white/12 bg-[#141816]/85 backdrop-blur-md p-4">
                  <div className="flex items-center gap-2 text-[#D5B883] text-xs font-medium mb-1">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>{t.hero.cardCaption}</span>
                  </div>
                  <p className="text-[11px] text-[#E4DFD5]/75 leading-relaxed">
                    {t.hero.cardSubcaption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Passport Strip */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 rounded-2xl border border-white/12 bg-[#141816]/75 backdrop-blur-md p-4 sm:p-5">
          {t.hero.passport.map((item) => (
            <div
              key={item.value}
              className="px-2 sm:px-3 py-1 border-l border-[#C9A96E]/35 first:border-l-0 lg:first:border-l-0"
            >
              <div className="font-display text-xl sm:text-2xl text-[#F6F4EF] font-medium">
                {item.value}
              </div>
              <div className="text-[11px] sm:text-xs text-[#E4DFD5]/70 mt-0.5 leading-snug">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
