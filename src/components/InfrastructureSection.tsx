import { Droplets, Flame, KeyRound, Landmark, Wifi, Zap } from 'lucide-react'
import type { Translations } from '../i18n/translations'
import poolAerialImg from '../assets/photos/pool-aerial.jpg'
import banyaSaunaImg from '../assets/photos/banya-sauna.jpg'
import parkAlleyImg from '../assets/photos/park-alley.jpg'
import playgroundImg from '../assets/photos/playground.jpg'
import entranceSignImg from '../assets/photos/entrance-sign.jpg'

interface InfrastructureSectionProps {
  t: Translations
}

const IMAGE_MAP = {
  pool: poolAerialImg,
  banya: banyaSaunaImg,
  alley: parkAlleyImg,
  playground: playgroundImg,
  security: entranceSignImg,
} as const

const UTILITY_ICONS = [Droplets, Flame, Zap, Wifi, Landmark] as const

export function InfrastructureSection({ t }: InfrastructureSectionProps) {
  return (
    <section id="infrastructure" className="py-16 sm:py-24 bg-[#F6F4EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs tracking-[0.2em] uppercase text-[#8A6D3B] font-semibold">
              {t.infra.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] leading-[1.15] text-[#171A18]">
              {t.infra.title}
            </h2>
            <p className="text-sm sm:text-base text-[#525753] leading-relaxed">
              {t.infra.subtitle}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 self-start lg:self-end rounded-full border border-[#1B332A]/20 bg-[#1B332A]/5 px-4 py-2 text-xs font-medium text-[#1B332A]">
            <KeyRound className="w-3.5 h-3.5 text-[#8A6D3B]" />
            <span>{t.infra.accessBadge}</span>
          </div>
        </div>

        {/* Photo-driven Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 sm:gap-5">
          {t.infra.cards.map((card, idx) => {
            const isLarge = idx < 2
            return (
              <article
                key={card.id}
                className={`group relative rounded-2xl overflow-hidden bg-[#141816] border border-[#171A18]/10 ${
                  isLarge ? 'md:col-span-3 min-h-[340px] sm:min-h-[390px]' : 'md:col-span-2 min-h-[300px] sm:min-h-[340px]'
                }`}
              >
                <img
                  src={IMAGE_MAP[card.imageKey]}
                  alt={card.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111513]/95 via-[#111513]/45 to-transparent" />

                <div className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-6">
                  <div>
                    <span className="inline-flex items-center rounded-full bg-[#141816]/75 backdrop-blur-sm border border-[#C9A96E]/40 px-3 py-1 text-xs font-medium text-[#E6D1A7]">
                      {card.metric}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display text-xl sm:text-2xl text-[#F6F4EF] leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#E4DFD5]/80 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Central Communications Block */}
        <div className="mt-12 sm:mt-16 rounded-3xl bg-[#1B332A] text-[#F6F4EF] p-6 sm:p-10 lg:p-12 border border-[#2A4D3E]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-8 border-b border-white/12">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs tracking-[0.2em] uppercase text-[#D5B883] font-semibold">
                {t.infra.utilitiesEyebrow}
              </p>
              <h3 className="font-display text-2xl sm:text-3xl text-[#F6F4EF]">
                {t.infra.utilitiesTitle}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#DCE3DF]/80 max-w-md leading-relaxed">
              {t.infra.utilitiesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 pt-8">
            {t.infra.utilities.map((item, idx) => {
              const Icon = UTILITY_ICONS[idx % UTILITY_ICONS.length]
              return (
                <div
                  key={item.title}
                  className="rounded-2xl bg-white/[0.05] border border-white/10 p-5 flex flex-col justify-between gap-4 hover:bg-white/[0.08] transition-colors"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#C9A96E]/15 border border-[#C9A96E]/30 flex items-center justify-center text-[#D5B883]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold text-sm sm:text-base text-[#F6F4EF]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#DCE3DF]/78 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/10 text-[11px] font-medium tracking-wide text-[#D5B883]">
                    {item.provider}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
