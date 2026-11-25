import { useEffect, useMemo, useState } from 'react'
import { Calendar, CheckCircle2, Compass, Home, MapPin, MessageCircle, Waves } from 'lucide-react'
import type { Translations } from '../i18n/translations'
import { fetchLots, type Lot, type LotStatus } from '../services/lotsService'
import { buildLotWhatsAppUrl, type Lang } from '../utils/whatsapp'

interface MasterplanSectionProps {
  lang: Lang
  t: Translations
  onSelectLotForViewing: (lot: Lot) => void
}

const STATUS_STYLE: Record<
  LotStatus,
  { tile: string; selectedTile: string; badge: string; dot: string }
> = {
  available: {
    tile: 'bg-[#E6F1EB] border-[#1B332A]/35 text-[#172821] hover:bg-[#1B332A] hover:text-[#F6F4EF] hover:border-[#1B332A]',
    selectedTile: 'bg-[#1B332A] border-[#C9A96E] text-[#F6F4EF] ring-2 ring-[#C9A96E] shadow-md',
    badge: 'bg-[#E6F1EB] text-[#1B332A] border-[#1B332A]/25',
    dot: 'bg-[#1B332A]',
  },
  reserved: {
    tile: 'bg-[#F6EEDB] border-[#B8955A]/45 text-[#6F5323] hover:bg-[#B8955A] hover:text-white',
    selectedTile: 'bg-[#B8955A] border-[#141816] text-white ring-2 ring-[#141816]/30 shadow-md',
    badge: 'bg-[#F6EEDB] text-[#7D5E26] border-[#B8955A]/40',
    dot: 'bg-[#B8955A]',
  },
  sold: {
    tile: 'bg-[#E8E5DE] border-[#CFCAC0] text-[#8E8B83] hover:bg-[#DDD9D0]',
    selectedTile: 'bg-[#6F6D66] border-[#141816] text-white ring-2 ring-[#141816]/25',
    badge: 'bg-[#E8E5DE] text-[#6B6861] border-[#CFCAC0]',
    dot: 'bg-[#9E9B93]',
  },
}

export function MasterplanSection({ lang, t, onSelectLotForViewing }: MasterplanSectionProps) {
  const [lots, setLots] = useState<Lot[]>([])
  const [source, setSource] = useState<'local' | 'supabase'>('local')
  const [filter, setFilter] = useState<'all' | LotStatus>('all')
  const [selectedLotId, setSelectedLotId] = useState<string>('AV-08')

  useEffect(() => {
    let active = true
    fetchLots().then((res) => {
      if (!active) return
      setLots(res.lots)
      setSource(res.source)
      const firstAvailable = res.lots.find((l) => l.status === 'available')
      if (firstAvailable) {
        setSelectedLotId(firstAvailable.id)
      }
    })
    return () => {
      active = false
    }
  }, [])

  const counts = useMemo(() => {
    return {
      all: lots.length,
      available: lots.filter((l) => l.status === 'available').length,
      reserved: lots.filter((l) => l.status === 'reserved').length,
      sold: lots.filter((l) => l.status === 'sold').length,
    }
  }, [lots])

  const westLots = useMemo(
    () => lots.filter((l) => l.row === 'west').sort((a, b) => a.position - b.position),
    [lots],
  )
  const eastTopLots = useMemo(
    () => lots.filter((l) => l.row === 'east' && l.position <= 10).sort((a, b) => a.position - b.position),
    [lots],
  )
  const eastBottomLots = useMemo(
    () => lots.filter((l) => l.row === 'east' && l.position > 10).sort((a, b) => a.position - b.position),
    [lots],
  )

  const selectedLot = useMemo(
    () => lots.find((l) => l.id === selectedLotId) ?? lots[0] ?? null,
    [lots, selectedLotId],
  )

  const renderLotButton = (lot: Lot) => {
    const isSelected = selectedLot?.id === lot.id
    const isDimmed = filter !== 'all' && lot.status !== filter
    const style = STATUS_STYLE[lot.status]

    return (
      <button
        key={lot.id}
        type="button"
        onClick={() => setSelectedLotId(lot.id)}
        data-track="masterplan_lot_select"
        data-lot-id={lot.id}
        aria-label={`${t.masterplan.detail.lotPrefix}${lot.number} (${t.masterplan.statuses[lot.status]})`}
        className={`relative h-10 sm:h-11 rounded-lg border text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
          isSelected ? style.selectedTile : style.tile
        } ${isDimmed ? 'opacity-25' : 'opacity-100'}`}
      >
        <span>{lot.number}</span>
      </button>
    )
  }

  return (
    <section id="masterplan" className="py-16 sm:py-24 bg-[#ECE8DF]/65 border-y border-[#171A18]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs tracking-[0.2em] uppercase text-[#8A6D3B] font-semibold">
              {t.masterplan.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] leading-[1.15] text-[#171A18]">
              {t.masterplan.title}
            </h2>
            <p className="text-sm sm:text-base text-[#525753] leading-relaxed">
              {t.masterplan.subtitle}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {(['all', 'available', 'reserved', 'sold'] as const).map((key) => {
              const active = filter === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  data-track={`masterplan_filter_${key}`}
                  className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium border transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#171A18] text-[#F6F4EF] border-[#171A18]'
                      : 'bg-white/80 text-[#343835] border-[#171A18]/12 hover:border-[#171A18]/35'
                  }`}
                >
                  {key !== 'all' && (
                    <span className={`w-2 h-2 rounded-full ${STATUS_STYLE[key].dot}`} />
                  )}
                  <span>{t.masterplan.filters[key]}</span>
                  <span className={active ? 'text-[#D5B883]' : 'text-[#7C7E7B]'}>
                    {counts[key]}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Main Masterplan + Detail Sidebar */}
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Interactive Plan Board */}
          <div className="lg:col-span-8 rounded-3xl bg-[#FBF9F5] border border-[#171A18]/10 p-4 sm:p-6 shadow-sm">
            {/* Top Entry Marker */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-[#171A18]/10">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1B332A]">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1B332A] text-[#D5B883]">
                  <Compass className="w-3.5 h-3.5" />
                </span>
                <span>{t.masterplan.map.kpp2}</span>
              </div>
              <span className="text-[11px] text-[#6E726E] bg-[#ECE8DF] px-2.5 py-1 rounded-full">
                {t.masterplan.map.kpp1}
              </span>
            </div>

            {/* Two-Row Architectural Schematic mirroring the real Apple Village plan */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
              {/* West Row: 20 cottages */}
              <div className="sm:col-span-5 flex flex-col">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#6A6E6B] mb-2.5">
                  {t.masterplan.map.westRow}
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-2 gap-2">
                  {westLots.map(renderLotButton)}
                </div>
              </div>

              {/* Central Avenue */}
              <div className="sm:col-span-2 flex sm:flex-col items-center justify-center rounded-xl bg-[#EAE6DD] border border-dashed border-[#B7B1A4] py-2.5 px-3 text-center">
                <span className="text-[11px] font-medium tracking-wider uppercase text-[#66635B] sm:[writing-mode:vertical-rl] sm:rotate-180">
                  {t.masterplan.map.avenue}
                </span>
              </div>

              {/* East Row: 19 cottages + Club Pool Zone in the heart */}
              <div className="sm:col-span-5 flex flex-col">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#6A6E6B] mb-2.5">
                  {t.masterplan.map.eastRow}
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-2 gap-2">
                  {eastTopLots.map(renderLotButton)}
                </div>

                {/* Club Pool & Banya Block */}
                <div className="my-2.5 rounded-xl bg-[#1B332A] text-[#F6F4EF] p-3 border border-[#C9A96E]/40 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#C9A96E]/20 text-[#D5B883] flex items-center justify-center shrink-0">
                    <Waves className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-[#D5B883] leading-tight">
                      {t.masterplan.map.clubZone}
                    </div>
                    <div className="text-[11px] text-[#E4DFD5]/80 leading-snug mt-0.5">
                      {t.masterplan.map.clubZoneSub}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-2 gap-2">
                  {eastBottomLots.map(renderLotButton)}
                </div>
              </div>
            </div>

            {/* 700m Park Alley Footer Strip */}
            <div className="mt-5 rounded-xl bg-[#E6F0EA] border border-[#1B332A]/20 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-[#1B332A] font-medium">
              <span>{t.masterplan.map.alleyLabel}</span>
              <span className="text-[11px] text-[#4C655B]">3.2 га · ИЖС</span>
            </div>

            {/* Source Note */}
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#7A7D79]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1B332A]" />
              <span>
                {source === 'supabase' ? t.masterplan.sourceLiveNote : t.masterplan.sourceLocalNote}
              </span>
            </div>
          </div>

          {/* Selected Lot Detail Card */}
          <div className="lg:col-span-4 rounded-3xl bg-[#141816] text-[#F6F4EF] p-6 sm:p-7 border border-white/10 shadow-xl sticky top-24">
            {selectedLot ? (
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-3 pb-5 border-b border-white/10">
                  <div>
                    <div className="text-[11px] tracking-[0.2em] uppercase text-[#C9A96E] font-medium">
                      {selectedLot.id}
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl text-[#F6F4EF] mt-1">
                      {t.masterplan.detail.lotPrefix}
                      {selectedLot.number}
                    </h3>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
                      STATUS_STYLE[selectedLot.status].badge
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${STATUS_STYLE[selectedLot.status].dot}`} />
                    {t.masterplan.statuses[selectedLot.status]}
                  </span>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/[0.04] border border-white/8 p-3.5">
                    <div className="text-[11px] text-[#B7B5AE]">{t.masterplan.detail.totalArea}</div>
                    <div className="font-display text-xl text-[#F6F4EF] mt-0.5">
                      {selectedLot.houseAreaTotal} м²
                    </div>
                    <div className="text-[11px] text-[#C9A96E] mt-0.5">
                      {t.masterplan.detail.livingArea}: {selectedLot.houseAreaLiving} м²
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/[0.04] border border-white/8 p-3.5">
                    <div className="text-[11px] text-[#B7B5AE]">{t.masterplan.detail.terrace}</div>
                    <div className="font-display text-xl text-[#F6F4EF] mt-0.5">
                      +{selectedLot.terraceArea} м²
                    </div>
                    <div className="text-[11px] text-[#B7B5AE] mt-0.5">
                      {t.masterplan.detail.landArea}: {selectedLot.landAreaSotok} сот. ({selectedLot.purpose})
                    </div>
                  </div>
                </div>

                {/* Location Highlight */}
                <div className="flex items-start gap-2.5 rounded-xl bg-[#1B332A]/60 border border-[#C9A96E]/25 p-3.5 text-xs text-[#E4DFD5]">
                  <MapPin className="w-4 h-4 text-[#D5B883] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[#D5B883] font-medium mb-0.5">
                      {t.masterplan.detail.locationFeature}
                    </div>
                    <div>{t.masterplan.features[selectedLot.featureKey]}</div>
                  </div>
                </div>

                {/* Contextual Status Message */}
                <p className="text-xs text-[#B7B5AE] leading-relaxed">
                  {selectedLot.status === 'available'
                    ? t.masterplan.detail.paymentNote
                    : selectedLot.status === 'reserved'
                      ? t.masterplan.detail.reservedNote
                      : t.masterplan.detail.soldNote}
                </p>

                {/* Actions with data-lot-id */}
                <div className="space-y-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => onSelectLotForViewing(selectedLot)}
                    data-track="lot_book_viewing"
                    data-lot-id={selectedLot.id}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A96E] hover:bg-[#D8BB84] text-[#141816] font-semibold text-sm py-3.5 px-5 transition-colors cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{t.masterplan.detail.ctaBookLot}</span>
                  </button>

                  <a
                    href={buildLotWhatsAppUrl(selectedLot.number, selectedLot.id, lang)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="whatsapp_lot_inquiry"
                    data-lot-id={selectedLot.id}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/20 hover:border-[#C9A96E]/60 hover:bg-white/5 text-[#F6F4EF] font-medium text-sm py-3 px-5 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#78C994]" />
                    <span>{t.masterplan.detail.ctaWhatsAppLot}</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-sm text-[#B7B5AE] flex flex-col items-center gap-3">
                <Home className="w-6 h-6 text-[#C9A96E]" />
                <span>{t.masterplan.detail.selectPrompt}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
