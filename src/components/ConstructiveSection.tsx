import { useState } from 'react'
import { Check, FileDown, Flame, Hammer, Trees } from 'lucide-react'
import type { Translations } from '../i18n/translations'
import { BOOKLET_FILENAME, BOOKLET_URL } from '../utils/whatsapp'
import terraceViewImg from '../assets/photos/terrace-view.jpg'
import cottageFacadeImg from '../assets/photos/cottage-facade.jpg'
import bbqZoneImg from '../assets/photos/bbq-zone.jpg'
import landscapingImg from '../assets/photos/landscaping-irrigation.jpg'
import courtyardWindowImg from '../assets/photos/courtyard-window.jpg'

interface ConstructiveSectionProps {
  lang: 'ru' | 'kz'
  t: Translations
}

type TabKey = 'plot' | 'structure' | 'prefinish'

export function ConstructiveSection({ lang, t }: ConstructiveSectionProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('plot')

  const tabMeta: Record<
    TabKey,
    {
      label: string
      title: string
      desc: string
      items: Array<{ title: string; desc: string }>
      primaryImg: string
      secondaryImg: string
      icon: typeof Trees
    }
  > = {
    plot: {
      label: t.constructive.tabs.plot,
      title: t.constructive.plotTitle,
      desc: t.constructive.plotDesc,
      items: t.constructive.plotItems,
      primaryImg: terraceViewImg,
      secondaryImg: bbqZoneImg,
      icon: Trees,
    },
    structure: {
      label: t.constructive.tabs.structure,
      title: t.constructive.structureTitle,
      desc: t.constructive.structureDesc,
      items: t.constructive.structureItems,
      primaryImg: cottageFacadeImg,
      secondaryImg: landscapingImg,
      icon: Hammer,
    },
    prefinish: {
      label: t.constructive.tabs.prefinish,
      title: t.constructive.prefinishTitle,
      desc: t.constructive.prefinishDesc,
      items: t.constructive.prefinishItems,
      primaryImg: courtyardWindowImg,
      secondaryImg: terraceViewImg,
      icon: Flame,
    },
  }

  const current = tabMeta[activeTab]

  return (
    <section id="constructive" className="py-16 sm:py-24 bg-[#F6F4EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-8 sm:mb-12">
          <p className="text-xs tracking-[0.2em] uppercase text-[#8A6D3B] font-semibold">
            {t.constructive.eyebrow}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] leading-[1.15] text-[#171A18]">
            {t.constructive.title}
          </h2>
          <p className="text-sm sm:text-base text-[#525753] leading-relaxed">
            {t.constructive.subtitle}
          </p>
        </div>

        {/* Tab Bar */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(['plot', 'structure', 'prefinish'] as const).map((key) => {
            const Icon = tabMeta[key].icon
            const isActive = activeTab === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                data-track={`constructive_tab_${key}`}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-medium border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1B332A] text-[#F6F4EF] border-[#1B332A] shadow-sm'
                    : 'bg-white text-[#303431] border-[#171A18]/12 hover:border-[#1B332A]/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#D5B883]' : 'text-[#8A6D3B]'}`} />
                <span>{tabMeta[key].label}</span>
              </button>
            )
          })}
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <h3 className="font-display text-2xl sm:text-3xl text-[#171A18]">
                {current.title}
              </h3>
              <p className="text-sm text-[#575C58] leading-relaxed">{current.desc}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {current.items.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-white border border-[#171A18]/8 p-5 space-y-2 shadow-[0_2px_12px_rgba(20,24,22,0.03)]"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1B332A]/10 text-[#1B332A] shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    <h4 className="font-semibold text-sm text-[#171A18]">{item.title}</h4>
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#575C58] leading-relaxed pl-7">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Real Photos Collage */}
          <div className="lg:col-span-5 grid grid-cols-12 gap-3.5 items-stretch">
            <div className="col-span-7 rounded-2xl overflow-hidden border border-[#171A18]/10 aspect-[3/4] bg-[#141816]">
              <img
                src={current.primaryImg}
                alt={current.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-5 flex flex-col gap-3.5">
              <div className="rounded-2xl overflow-hidden border border-[#171A18]/10 flex-1 bg-[#141816] min-h-[170px]">
                <img
                  src={current.secondaryImg}
                  alt={current.label}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl bg-[#141816] text-[#F6F4EF] p-4 border border-white/10">
                <div className="font-display text-2xl text-[#D5B883]">
                  {lang === 'kz' ? '5 жыл' : '5 лет'}
                </div>
                <div className="text-[11px] text-[#D8D4CC] mt-0.5 leading-snug">
                  {lang === 'kz'
                    ? 'Daewoo қазандығына кепілдік · үйге 1 жыл кепілдік'
                    : 'Гарантия на котёл Daewoo · 1 год гарантия на дом'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booklet Presentation Download Banner */}
        <div className="mt-12 sm:mt-16 rounded-3xl bg-[#ECE8DF] border border-[#171A18]/10 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-2xl">
            <h3 className="font-display text-xl sm:text-2xl text-[#171A18]">
              {t.constructive.bookletBannerTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#575C58]">
              {t.constructive.bookletBannerDesc}
            </p>
          </div>
          <a
            href={BOOKLET_URL}
            download={BOOKLET_FILENAME}
            target="_blank"
            rel="noopener noreferrer"
            data-track="pdf_download_constructive"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#1B332A] hover:bg-[#26473B] text-[#F6F4EF] text-sm font-semibold px-6 py-3.5 transition-colors shrink-0"
          >
            <FileDown className="w-4 h-4 text-[#D5B883]" />
            <span>{t.constructive.bookletBannerBtn}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
