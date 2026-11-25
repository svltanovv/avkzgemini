import { useEffect, useMemo, useState } from 'react'
import {
  Building2,
  Calendar,
  Car,
  CheckCircle2,
  Compass,
  Dumbbell,
  Home,
  MapPin,
  MessageCircle,
  MoveHorizontal,
  Shield,
  Trees,
  Waves,
} from 'lucide-react'
import type { Translations } from '../i18n/translations'
import { fetchLots, type Lot, type LotStatus } from '../services/lotsService'
import { buildLotWhatsAppUrl, type Lang } from '../utils/whatsapp'
import logoBlackHorizontal from '../assets/logos/av-logo-horizontal-black.svg'

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
    tile: 'bg-[#1B332A] border-[#14261F] text-[#F6F4EF] hover:bg-[#26473B] hover:border-[#C9A96E]',
    selectedTile:
      'bg-[#1B332A] border-[#C9A96E] text-[#F6F4EF] ring-2 ring-[#C9A96E] ring-offset-1 ring-offset-[#FBF9F5] shadow-lg scale-[1.04] z-10',
    badge: 'bg-[#E6F1EB] text-[#1B332A] border-[#1B332A]/25',
    dot: 'bg-[#1B332A]',
  },
  reserved: {
    tile: 'bg-[#C9A96E] border-[#A7874D] text-[#141816] hover:bg-[#D5B883]',
    selectedTile:
      'bg-[#B8955A] border-[#141816] text-white ring-2 ring-[#141816] ring-offset-1 ring-offset-[#FBF9F5] shadow-lg scale-[1.04] z-10',
    badge: 'bg-[#F6EEDB] text-[#7D5E26] border-[#B8955A]/40',
    dot: 'bg-[#C9A96E]',
  },
  sold: {
    tile: 'bg-[#DFDBD2] border-[#CAC4B8] text-[#77736B] hover:bg-[#D5D0C5]',
    selectedTile:
      'bg-[#68645C] border-[#141816] text-[#F6F4EF] ring-2 ring-[#141816]/60 ring-offset-1 ring-offset-[#FBF9F5] shadow-md scale-[1.04] z-10',
    badge: 'bg-[#E8E5DE] text-[#6B6861] border-[#CFCAC0]',
    dot: 'bg-[#A6A299]',
  },
}

export function MasterplanSection({ lang, t, onSelectLotForViewing }: MasterplanSectionProps) {
  const [lots, setLots] = useState<Lot[]>([])
  const [source, setSource] = useState<'local' | 'supabase'>('local')
  const [filter, setFilter] = useState<'all' | LotStatus>('all')
  const [selectedLotId, setSelectedLotId] = useState<string>('AV-19')

  useEffect(() => {
    let active = true
    fetchLots().then((res) => {
      if (!active) return
      setLots(res.lots)
      setSource(res.source)
      const preferred =
        res.lots.find((l) => l.id === 'AV-19' && l.status === 'available') ??
        res.lots.find((l) => l.status === 'available')
      if (preferred) {
        setSelectedLotId(preferred.id)
      }
    })
    return () => {
      active = false
    }
  }, [])

  const counts = useMemo(
    () => ({
      all: lots.length,
      available: lots.filter((l) => l.status === 'available').length,
      reserved: lots.filter((l) => l.status === 'reserved').length,
      sold: lots.filter((l) => l.status === 'sold').length,
    }),
    [lots],
  )

  const availableLots = useMemo(
    () => lots.filter((l) => l.status === 'available').sort((a, b) => a.number - b.number),
    [lots],
  )

  // Map 21 horizontal columns (positions 1..21) for north & south rows matching the real masterplan
  const northByPos = useMemo(() => {
    const map = new Map<number, Lot>()
    for (const lot of lots) {
      if (lot.row === 'north') map.set(lot.position, lot)
    }
    return map
  }, [lots])

  const southByPos = useMemo(() => {
    const map = new Map<number, Lot>()
    for (const lot of lots) {
      if (lot.row === 'south') map.set(lot.position, lot)
    }
    return map
  }, [lots])

  const selectedLot = useMemo(
    () => lots.find((l) => l.id === selectedLotId) ?? lots[0] ?? null,
    [lots, selectedLotId],
  )

  const renderLotTile = (lot: Lot) => {
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
        aria-label={`${t.masterplan.detail.lotPrefix}${lot.number} (${t.masterplan.map.plotShort} ${lot.plotNumber}, ${t.masterplan.statuses[lot.status]})`}
        className={`relative h-[66px] rounded-md border flex flex-col items-center justify-center px-0.5 transition-all cursor-pointer select-none ${
          isSelected ? style.selectedTile : style.tile
        } ${isDimmed ? 'opacity-25' : 'opacity-100'}`}
      >
        <span className="text-[11px] font-bold leading-none">№{lot.number}</span>
        <span
          className={`text-[9px] leading-none mt-1 ${
            lot.status === 'available' || isSelected ? 'opacity-80' : 'opacity-70'
          }`}
        >
          {t.masterplan.map.plotShort} {lot.plotNumber}
        </span>
      </button>
    )
  }

  return (
    <section id="masterplan" className="py-16 sm:py-24 bg-[#ECE8DF]/70 border-y border-[#171A18]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Status Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-7">
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
                      : 'bg-white/85 text-[#343835] border-[#171A18]/12 hover:border-[#171A18]/35'
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

        {/* Quick-Pick Chips for Available Cottages (instant tap on mobile & desktop) */}
        {availableLots.length > 0 && (
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#1B332A] mr-1">
              {t.masterplan.map.quickAvailable}
            </span>
            {availableLots.map((lot) => {
              const active = selectedLot?.id === lot.id
              return (
                <button
                  key={lot.id}
                  type="button"
                  onClick={() => setSelectedLotId(lot.id)}
                  data-track="masterplan_quick_lot_select"
                  data-lot-id={lot.id}
                  className={`rounded-full px-3 py-1 text-xs font-semibold border transition-all cursor-pointer ${
                    active
                      ? 'bg-[#1B332A] text-[#F6F4EF] border-[#C9A96E] shadow-xs'
                      : 'bg-white text-[#1B332A] border-[#1B332A]/25 hover:bg-[#1B332A]/10'
                  }`}
                >
                  №{lot.number}{' '}
                  <span className="font-normal opacity-75">
                    ({t.masterplan.map.plotShort} {lot.plotNumber})
                  </span>
                </button>
              )
            })}
          </div>
        )}

        {/* Full-Width Architectural Masterplan Board matching the real village layout */}
        <div className="rounded-3xl bg-[#FBF9F5] border border-[#171A18]/10 p-4 sm:p-6 shadow-sm">
          {/* Board Top Bar with Official Logo */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-[#171A18]/10">
            <img
              src={logoBlackHorizontal}
              alt="Apple Village"
              className="h-7 sm:h-8 w-auto object-contain opacity-90"
            />
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#5B605C]">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#1B332A]" />
                {t.masterplan.statuses.available} ({counts.available})
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#C9A96E]" />
                {t.masterplan.statuses.reserved} ({counts.reserved})
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#DFDBD2] border border-[#CAC4B8]" />
                {t.masterplan.statuses.sold} ({counts.sold})
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#265D68]" />
                {t.masterplan.map.poolSaunas}
              </span>
            </div>
          </div>

          {/* Mobile Horizontal Scroll Hint */}
          <div className="flex lg:hidden items-center gap-1.5 text-[11px] text-[#8A6D3B] mb-3 font-medium">
            <MoveHorizontal className="w-3.5 h-3.5" />
            <span>{t.masterplan.map.scrollHint}</span>
          </div>

          {/* Scrollable Blueprint Canvas */}
          <div className="overflow-x-auto pb-2 -mx-1 px-1">
            <div className="min-w-[1060px] rounded-2xl bg-[#EEF1EA] border border-[#1B332A]/12 p-3.5">
              <div className="flex items-stretch gap-3">
                {/* LEFT EDGE: Kuldzhinsky Tract Road */}
                <div className="w-9 shrink-0 rounded-xl bg-[#484C4A] text-[#E8E4DC] flex flex-col items-center justify-between py-4 px-1 relative overflow-hidden">
                  <div className="w-px flex-1 border-l border-dashed border-white/35 my-1" />
                  <span className="text-[10px] font-semibold tracking-[0.16em] uppercase whitespace-nowrap [writing-mode:vertical-rl] rotate-180 my-2">
                    {t.masterplan.map.kuldzhinka}
                  </span>
                  <div className="w-px flex-1 border-l border-dashed border-white/35 my-1" />
                </div>

                {/* ENTRY GROUP: Guest Parking, Guard (KPP), Sales Office, BAKAD */}
                <div className="w-[124px] shrink-0 flex flex-col justify-between gap-2">
                  {/* Top: Guard + Inner Guest Parking */}
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="rounded-lg bg-[#E9E1F0] border border-[#8E77A6]/35 p-2 flex flex-col items-center justify-center text-center min-h-[66px]">
                      <Shield className="w-3.5 h-3.5 text-[#5D4675] mb-1" />
                      <span className="text-[9px] font-semibold text-[#47335C] leading-tight">
                        {t.masterplan.map.guard}
                      </span>
                    </div>
                    <div className="rounded-lg bg-[#E4E3DF] border border-[#171A18]/15 p-1.5 flex flex-col items-center justify-center text-center min-h-[66px]">
                      <Car className="w-3.5 h-3.5 text-[#4E5350] mb-1" />
                      <span className="text-[8.5px] font-medium text-[#474B48] leading-tight">
                        {t.masterplan.map.guestParking}
                      </span>
                    </div>
                  </div>

                  {/* Middle: Main Guest Parking + Gate */}
                  <div className="rounded-lg bg-[#E4E3DF] border border-[#171A18]/15 px-2 py-2.5 flex items-center justify-center gap-1.5 text-center">
                    <Car className="w-3.5 h-3.5 text-[#4E5350] shrink-0" />
                    <span className="text-[9.5px] font-semibold text-[#3C403D] leading-tight">
                      {t.masterplan.map.guestParking}
                    </span>
                  </div>

                  {/* Bottom: Sales Office + BAKAD direction */}
                  <div className="space-y-1.5">
                    <div className="rounded-lg bg-[#5A3E24] text-[#F6F4EF] border border-[#3E2A17] px-2 py-2.5 flex items-center justify-center gap-1.5 text-center">
                      <Building2 className="w-3.5 h-3.5 text-[#D5B883] shrink-0" />
                      <span className="text-[10px] font-semibold leading-tight">
                        {t.masterplan.map.office}
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-md bg-[#1B332A]/10 px-2 py-1 text-[9px] font-semibold text-[#1B332A]">
                      <Compass className="w-3 h-3 shrink-0" />
                      <span>{t.masterplan.map.bakad}</span>
                    </div>
                  </div>
                </div>

                {/* MAIN VILLAGE BODY: 21 aligned columns (North Row + Street + South Row + Park Alley) */}
                <div className="flex-1 flex flex-col gap-2">
                  {/* TOP ROW (20 cottages: №2..№38 incl. №21 + Slot 21 Guest Parking) */}
                  <div className="grid grid-cols-21 gap-1">
                    {Array.from({ length: 20 }, (_, i) => {
                      const pos = i + 1
                      const lot = northByPos.get(pos)
                      return lot ? renderLotTile(lot) : <div key={`n-empty-${pos}`} />
                    })}
                    {/* Slot 21: Far-right Guest Parking */}
                    <div className="h-[66px] rounded-md bg-[#E4E3DF] border border-dashed border-[#9E9B93] flex flex-col items-center justify-center text-center px-0.5">
                      <Car className="w-3.5 h-3.5 text-[#545855] mb-0.5" />
                      <span className="text-[7.5px] font-semibold text-[#4F5350] leading-[1.1]">
                        {t.masterplan.map.guestParking}
                      </span>
                    </div>
                  </div>

                  {/* CENTRAL AVENUE ROAD */}
                  <div className="h-9 rounded-lg bg-[#424644] px-4 flex items-center justify-between relative overflow-hidden">
                    <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 border-t border-dashed border-white/40" />
                    <span className="relative z-10 bg-[#424644] px-2 text-[10px] font-medium tracking-wider uppercase text-[#E4DFD5]/85">
                      {t.masterplan.map.street}
                    </span>
                    <span className="relative z-10 bg-[#424644] px-2 text-[10px] text-[#D5B883]">
                      КПП →
                    </span>
                  </div>

                  {/* BOTTOM ROW (№1..№19, [Бассейн/сауны], [Спорт/дет. площадка], №23..№39) */}
                  <div className="grid grid-cols-21 gap-1">
                    {Array.from({ length: 21 }, (_, i) => {
                      const pos = i + 1
                      if (pos === 11) {
                        return (
                          <div
                            key="infra-pool"
                            title={t.masterplan.map.poolSaunas}
                            className="h-[66px] rounded-md bg-[#1F5864] border border-[#143F49] text-[#F6F4EF] flex flex-col items-center justify-center text-center px-0.5"
                          >
                            <Waves className="w-3.5 h-3.5 text-[#8BE0F0] mb-0.5 shrink-0" />
                            <span className="text-[7.5px] font-semibold leading-[1.1]">
                              {t.masterplan.map.poolSaunas}
                            </span>
                          </div>
                        )
                      }
                      if (pos === 12) {
                        return (
                          <div
                            key="infra-sport"
                            title={t.masterplan.map.sportPlayground}
                            className="h-[66px] rounded-md bg-[#E6D6B8] border border-[#B8955A]/60 text-[#3F2E14] flex flex-col items-center justify-center text-center px-0.5"
                          >
                            <Dumbbell className="w-3.5 h-3.5 text-[#8A6D3B] mb-0.5 shrink-0" />
                            <span className="text-[7.5px] font-semibold leading-[1.1]">
                              {t.masterplan.map.sportPlayground}
                            </span>
                          </div>
                        )
                      }
                      const lot = southByPos.get(pos)
                      return lot ? renderLotTile(lot) : <div key={`s-empty-${pos}`} />
                    })}
                  </div>

                  {/* SOUTHERN PARK-ALLEY STRIP (700 m) */}
                  <div className="rounded-lg bg-[#D7E4D8] border border-[#1B332A]/20 px-4 py-2 flex items-center justify-between text-[11px] font-semibold text-[#1B332A]">
                    <span className="inline-flex items-center gap-2">
                      <Trees className="w-4 h-4 text-[#26473B]" />
                      <span>{t.masterplan.map.parkAlley}</span>
                    </span>
                    <span className="text-[10px] font-medium text-[#3D594D]">
                      3.2 га · 39 коттеджей · ИЖС
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Source Note */}
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#7A7D79]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1B332A]" />
            <span>
              {source === 'supabase' ? t.masterplan.sourceLiveNote : t.masterplan.sourceLocalNote}
            </span>
          </div>
        </div>

        {/* Selected Lot Inspector Bar */}
        <div className="mt-5 rounded-3xl bg-[#141816] text-[#F6F4EF] p-5 sm:p-7 border border-white/10 shadow-xl">
          {selectedLot ? (
            <div className="grid lg:grid-cols-12 gap-6 items-center">
              {/* Lot Identity */}
              <div className="lg:col-span-3 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-[#C9A96E] font-medium">
                    {selectedLot.id} · {t.masterplan.map.plotShort} {selectedLot.plotNumber}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-2xl sm:text-3xl text-[#F6F4EF]">
                    {t.masterplan.detail.lotPrefix}
                    {selectedLot.number}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
                      STATUS_STYLE[selectedLot.status].badge
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${STATUS_STYLE[selectedLot.status].dot}`}
                    />
                    {t.masterplan.statuses[selectedLot.status]}
                  </span>
                </div>
                <p className="text-xs text-[#B7B5AE] leading-relaxed">
                  {selectedLot.status === 'available'
                    ? t.masterplan.detail.paymentNote
                    : selectedLot.status === 'reserved'
                      ? t.masterplan.detail.reservedNote
                      : t.masterplan.detail.soldNote}
                </p>
              </div>

              {/* Key Specs */}
              <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                    {selectedLot.landAreaSotok} сот. · {selectedLot.purpose}
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 rounded-xl bg-[#1B332A]/65 border border-[#C9A96E]/25 p-3.5 flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#D5B883] font-medium">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{t.masterplan.detail.locationFeature}</span>
                  </div>
                  <div className="text-xs text-[#F6F4EF] leading-snug mt-1">
                    {t.masterplan.features[selectedLot.featureKey]}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => onSelectLotForViewing(selectedLot)}
                  data-track="lot_book_viewing"
                  data-lot-id={selectedLot.id}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A96E] hover:bg-[#D8BB84] text-[#141816] font-semibold text-sm py-3.5 px-5 transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.masterplan.detail.ctaBookLot}</span>
                </button>

                <a
                  href={buildLotWhatsAppUrl(
                    selectedLot.number,
                    selectedLot.id,
                    lang,
                    selectedLot.plotNumber,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="whatsapp_lot_inquiry"
                  data-lot-id={selectedLot.id}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 hover:border-[#C9A96E]/60 hover:bg-white/5 text-[#F6F4EF] font-medium text-sm py-3 px-5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#78C994]" />
                  <span>{t.masterplan.detail.ctaWhatsAppLot}</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center text-sm text-[#B7B5AE] flex items-center justify-center gap-2">
              <Home className="w-5 h-5 text-[#C9A96E]" />
              <span>{t.masterplan.detail.selectPrompt}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
