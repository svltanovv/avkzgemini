import { useEffect, useState, type FormEvent } from 'react'
import { CheckCircle2, ExternalLink, MapPin, MessageCircle, Phone, Send, X } from 'lucide-react'
import type { Translations } from '../i18n/translations'
import type { Lot } from '../services/lotsService'
import { getClientIds, getStoredUtmParams, trackEvent } from '../utils/tracking'
import {
  SALES_PHONE_DISPLAY,
  SALES_PHONE_RAW,
  buildWhatsAppUrl,
  type Lang,
} from '../utils/whatsapp'
import villageAerialImg from '../assets/photos/village-aerial.jpg'

interface LocationAndFormSectionProps {
  lang: Lang
  t: Translations
  selectedLot: Lot | null
  onClearLot: () => void
  prefilledComment: string
  buttonContext: string
}

export function LocationAndFormSection({
  lang,
  t,
  selectedLot,
  onClearLot,
  prefilledComment,
  buttonContext,
}: LocationAndFormSectionProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  // Honeypot field: stays hidden & empty for humans
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (prefilledComment) {
      setComment(prefilledComment)
    }
  }, [prefilledComment])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const digits = phone.replace(/\D/g, '')
    if (!name.trim() || digits.length < 10) {
      trackEvent('form_validation_error', {
        form: 'viewing_request',
        ...(selectedLot ? { lot_id: selectedLot.id } : {}),
      })
      setStatus('error')
      return
    }

    setStatus('submitting')

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      comment: comment.trim(),
      lotId: selectedLot?.id ?? '',
      buttonContext: buttonContext || 'viewing_form_direct',
      lang,
      pageUrl: window.location.href,
      website, // honeypot
      utm: getStoredUtmParams(),
      clientIds: getClientIds(),
    }

    try {
      const response = await fetch('/.netlify/functions/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      setStatus('success')
      setName('')
      setPhone('')
      setComment('')
      trackEvent('form_submit_success', {
        form: 'viewing_request',
        button_context: payload.buttonContext,
        ...(selectedLot ? { lot_id: selectedLot.id } : {}),
      })
    } catch {
      setStatus('error')
      trackEvent('form_submit_error', {
        form: 'viewing_request',
        button_context: payload.buttonContext,
        ...(selectedLot ? { lot_id: selectedLot.id } : {}),
      })
    }
  }

  const waFallbackText =
    lang === 'kz'
      ? `Сәлеметсіз бе! Apple Village коттедж қалашығын көруге жазылғым келеді${selectedLot ? ` (учаске ${selectedLot.id})` : ''}.`
      : `Здравствуйте! Хочу записаться на просмотр коттеджного городка Apple Village${selectedLot ? ` (участок ${selectedLot.id})` : ''}.`

  return (
    <section id="location" className="py-16 sm:py-24 bg-[#F6F4EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: Location & Map Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <p className="text-xs tracking-[0.2em] uppercase text-[#8A6D3B] font-semibold">
                {t.location.eyebrow}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl leading-[1.15] text-[#171A18]">
                {t.location.title}
              </h2>
              <p className="text-sm sm:text-base text-[#525753] leading-relaxed">
                {t.location.subtitle}
              </p>
            </div>

            {/* Real Village Photo + Address Overlay */}
            <div className="relative rounded-3xl overflow-hidden border border-[#171A18]/10 bg-[#141816] aspect-[16/10]">
              <img
                src={villageAerialImg}
                alt="Въезд в коттеджный городок Apple Village со стороны Кульджинского тракта"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111513]/90 via-[#111513]/25 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-[#F6F4EF]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D5B883] shrink-0 mt-1" />
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[#D5B883]">
                      {t.location.addressLabel}
                    </div>
                    <div className="text-sm sm:text-base font-medium leading-snug mt-0.5">
                      {t.location.addressValue}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {t.location.highlights.map((item) => (
                <div
                  key={item.value}
                  className="rounded-2xl bg-white border border-[#171A18]/8 p-4"
                >
                  <div className="font-display text-lg text-[#1B332A] font-semibold">
                    {item.value}
                  </div>
                  <div className="text-xs text-[#575C58] mt-1 leading-snug">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Map Deep Links & Direct Phone */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://2gis.kz/almaty/search/Apple%20Village%20Туздыбастау"
                target="_blank"
                rel="noopener noreferrer"
                data-track="location_open_2gis"
                className="inline-flex items-center gap-2 rounded-full border border-[#171A18]/15 bg-white hover:border-[#1B332A] px-4 py-2.5 text-xs font-semibold text-[#171A18] transition-colors"
              >
                <span>{t.location.open2gis}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8A6D3B]" />
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Apple+Village+Tuzdybastau+Almaty"
                target="_blank"
                rel="noopener noreferrer"
                data-track="location_open_google_maps"
                className="inline-flex items-center gap-2 rounded-full border border-[#171A18]/15 bg-white hover:border-[#1B332A] px-4 py-2.5 text-xs font-semibold text-[#171A18] transition-colors"
              >
                <span>{t.location.openGoogleMaps}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8A6D3B]" />
              </a>

              <a
                href={`tel:${SALES_PHONE_RAW}`}
                data-track="location_phone_click"
                className="inline-flex items-center gap-2 rounded-full bg-[#1B332A]/8 hover:bg-[#1B332A]/15 px-4 py-2.5 text-xs font-semibold text-[#1B332A] transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{SALES_PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>

          {/* Right: Viewing Request Form */}
          <div
            id="viewing"
            className="lg:col-span-6 rounded-3xl bg-white border border-[#171A18]/10 p-6 sm:p-8 lg:p-10 shadow-sm"
          >
            <div className="space-y-2 mb-6">
              <h3 className="font-display text-2xl sm:text-3xl text-[#171A18]">
                {t.location.formTitle}
              </h3>
              <p className="text-sm text-[#575C58] leading-relaxed">
                {t.location.formSubtitle}
              </p>
            </div>

            {selectedLot && (
              <div className="mb-5 flex items-center justify-between gap-3 rounded-2xl bg-[#1B332A]/6 border border-[#1B332A]/20 px-4 py-3 text-xs">
                <div>
                  <span className="text-[#575C58]">{t.location.selectedLotLabel}: </span>
                  <span className="font-semibold text-[#1B332A]">
                    №{selectedLot.number} (уч. {selectedLot.plotNumber} · {selectedLot.id}) · 169 м² · 6 сот.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onClearLot}
                  className="inline-flex items-center gap-1 text-[#6E726E] hover:text-[#171A18] cursor-pointer"
                >
                  <span>{t.location.clearLot}</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {status === 'success' ? (
              <div className="rounded-2xl bg-[#E6F1EB] border border-[#1B332A]/25 p-6 space-y-3">
                <div className="flex items-center gap-2.5 text-[#1B332A] font-semibold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{t.location.successTitle}</span>
                </div>
                <p className="text-sm text-[#2E463C] leading-relaxed">
                  {t.location.successDesc}
                </p>
                <a
                  href={buildWhatsAppUrl(waFallbackText, lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="whatsapp_after_form_success"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1B332A] text-[#F6F4EF] text-xs font-semibold px-5 py-2.5 mt-1"
                >
                  <MessageCircle className="w-4 h-4 text-[#78C994]" />
                  <span>{t.location.whatsappFallback}</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Honeypot anti-spam trap (hidden from real users, read by Netlify Function) */}
                <div
                  aria-hidden="true"
                  className="absolute -left-[9999px] w-px h-px overflow-hidden opacity-0 pointer-events-none"
                >
                  <label htmlFor="av-website">Website</label>
                  <input
                    id="av-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="av-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#4A4F4B] mb-1.5"
                  >
                    {t.location.nameLabel}
                  </label>
                  <input
                    id="av-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.location.namePlaceholder}
                    className="w-full rounded-xl border border-[#171A18]/15 bg-[#FBF9F5] px-4 py-3 text-sm text-[#171A18] placeholder:text-[#989A96] focus:border-[#1B332A] focus:outline-none focus:ring-2 focus:ring-[#1B332A]/15"
                  />
                </div>

                <div>
                  <label
                    htmlFor="av-phone"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#4A4F4B] mb-1.5"
                  >
                    {t.location.phoneLabel}
                  </label>
                  <input
                    id="av-phone"
                    name="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.location.phonePlaceholder}
                    className="w-full rounded-xl border border-[#171A18]/15 bg-[#FBF9F5] px-4 py-3 text-sm text-[#171A18] placeholder:text-[#989A96] focus:border-[#1B332A] focus:outline-none focus:ring-2 focus:ring-[#1B332A]/15"
                  />
                </div>

                <div>
                  <label
                    htmlFor="av-comment"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#4A4F4B] mb-1.5"
                  >
                    {t.location.commentLabel}
                  </label>
                  <textarea
                    id="av-comment"
                    name="comment"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={t.location.commentPlaceholder}
                    className="w-full rounded-xl border border-[#171A18]/15 bg-[#FBF9F5] px-4 py-3 text-sm text-[#171A18] placeholder:text-[#989A96] focus:border-[#1B332A] focus:outline-none focus:ring-2 focus:ring-[#1B332A]/15 resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="rounded-xl bg-[#FDF2EE] border border-[#C76C54]/30 p-4 text-xs text-[#7D3624] space-y-2.5">
                    <p>{t.location.errorDesc}</p>
                    <a
                      href={buildWhatsAppUrl(waFallbackText, lang)}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-track="whatsapp_form_error_fallback"
                      className="inline-flex items-center gap-2 font-semibold text-[#1B332A] underline underline-offset-4"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25A25A]" />
                      <span>{t.location.whatsappFallback}</span>
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  data-track="form_viewing_submit"
                  data-lot-id={selectedLot?.id ?? ''}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#1B332A] hover:bg-[#26473B] disabled:opacity-60 text-[#F6F4EF] font-semibold text-sm py-3.5 px-6 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#D5B883]" />
                  <span>
                    {status === 'submitting' ? t.location.submittingBtn : t.location.submitBtn}
                  </span>
                </button>

                <p className="text-[11px] text-[#7D807C] leading-relaxed">
                  {t.location.privacyNote}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
