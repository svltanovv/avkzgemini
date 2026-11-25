import { Compass, FileDown, MessageCircle, Ruler } from 'lucide-react'
import type { Translations } from '../i18n/translations'
import { BOOKLET_FILENAME, BOOKLET_URL, buildWhatsAppUrl, type Lang } from '../utils/whatsapp'

interface FloorplansSectionProps {
  lang: Lang
  t: Translations
}

export function FloorplansSection({ lang, t }: FloorplansSectionProps) {
  const waText =
    lang === 'kz'
      ? 'Сәлеметсіз бе! Apple Village коттедж қалашығындағы 169 м² үйдің жоспарлау нұсқаларын жібере аласыз ба?'
      : 'Здравствуйте! Отправьте, пожалуйста, актуальные варианты планировок коттеджа 169 м² в КГ Apple Village.'

  return (
    <section id="floorplans" className="py-16 sm:py-24 bg-[#141816] text-[#F6F4EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs tracking-[0.2em] uppercase text-[#C9A96E] font-semibold">
              {t.floorplans.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] leading-[1.15] text-[#F6F4EF]">
              {t.floorplans.title}
            </h2>
            <p className="text-sm sm:text-base text-[#D8D4CC]/80 leading-relaxed">
              {t.floorplans.subtitle}
            </p>
          </div>
          <span className="inline-flex items-center gap-2 self-start lg:self-end rounded-full border border-[#C9A96E]/35 bg-[#C9A96E]/10 px-4 py-1.5 text-xs font-medium text-[#E6D1A7]">
            <Compass className="w-3.5 h-3.5" />
            <span>{t.floorplans.badge}</span>
          </span>
        </div>

        {/* Architectural Blueprint Placeholder Card */}
        <div className="relative rounded-3xl border border-white/12 bg-gradient-to-br from-[#1B221E] via-[#171C19] to-[#131715] p-6 sm:p-10 lg:p-12 overflow-hidden">
          {/* Subtle architectural blueprint grid background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #C9A96E 1px, transparent 1px), linear-gradient(to bottom, #C9A96E 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Minimalist Architectural Schematic SVG */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[#C9A96E]/25 bg-[#111513]/80 p-6 aspect-[4/3] flex flex-col justify-between">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[#C9A96E]/80">
                  <span>169 м² · +32 м² терраса</span>
                  <Ruler className="w-4 h-4" />
                </div>

                {/* Clean schematic wireframe */}
                <svg
                  viewBox="0 0 320 180"
                  className="w-full h-auto my-3 text-[#C9A96E]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect x="16" y="16" width="212" height="148" stroke="currentColor" strokeOpacity="0.65" strokeWidth="1.5" />
                  <rect x="228" y="28" width="76" height="124" stroke="currentColor" strokeOpacity="0.4" strokeDasharray="4 4" strokeWidth="1.5" />
                  <line x1="16" y1="88" x2="132" y2="88" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="3 3" />
                  <line x1="132" y1="16" x2="132" y2="164" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="3 3" />
                  <line x1="132" y1="104" x2="228" y2="104" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="3 3" />
                  <text x="48" y="56" fill="#E6D1A7" fillOpacity="0.7" fontSize="10" fontFamily="Manrope, sans-serif">
                    157 м²
                  </text>
                  <text x="242" y="94" fill="#E6D1A7" fillOpacity="0.65" fontSize="9" fontFamily="Manrope, sans-serif">
                    32 м²
                  </text>
                </svg>

                <div className="text-[11px] text-[#B7B5AE]">
                  {lang === 'kz'
                    ? '10 см қалқалар · Жеке жоспарлау нұсқасы'
                    : 'Перегородки 10 см · Индивидуальная конфигурация'}
                </div>
              </div>
            </div>

            {/* Info & Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h3 className="font-display text-2xl sm:text-3xl text-[#F6F4EF]">
                  {t.floorplans.placeholderTitle}
                </h3>
                <p className="text-sm text-[#D4D0C8]/80 leading-relaxed">
                  {t.floorplans.placeholderDesc}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {t.floorplans.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="rounded-xl bg-white/[0.04] border border-white/10 p-3.5"
                  >
                    <div className="font-display text-lg sm:text-xl text-[#D5B883]">
                      {spec.value}
                    </div>
                    <div className="text-[11px] text-[#B7B5AE] mt-0.5 leading-snug">
                      {spec.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href={buildWhatsAppUrl(waText, lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="whatsapp_floorplans"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A96E] hover:bg-[#D8BB84] text-[#141816] font-semibold text-sm px-6 py-3.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.floorplans.ctaWhatsApp}</span>
                </a>

                <a
                  href={BOOKLET_URL}
                  download={BOOKLET_FILENAME}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="pdf_download_floorplans"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 hover:border-[#C9A96E]/60 hover:bg-white/5 text-[#F6F4EF] font-medium text-sm px-6 py-3.5 transition-colors"
                >
                  <FileDown className="w-4 h-4 text-[#D5B883]" />
                  <span>{t.floorplans.ctaBooklet}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
