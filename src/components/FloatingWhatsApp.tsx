import { MessageCircle } from 'lucide-react'
import type { Translations } from '../i18n/translations'
import { buildWhatsAppUrl, type Lang } from '../utils/whatsapp'

interface FloatingWhatsAppProps {
  lang: Lang
  t: Translations
}

export function FloatingWhatsApp({ lang, t }: FloatingWhatsAppProps) {
  return (
    <a
      href={buildWhatsAppUrl(undefined, lang)}
      target="_blank"
      rel="noopener noreferrer"
      data-track="whatsapp_floating"
      aria-label={t.floatingWa.aria}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 rounded-full bg-[#1B332A] hover:bg-[#244639] text-[#F6F4EF] border border-[#C9A96E]/50 shadow-xl shadow-black/25 px-4 py-3 sm:px-5 sm:py-3.5 transition-all hover:-translate-y-0.5"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6BD08B] opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#46B86C]" />
      </span>
      <MessageCircle className="w-4 h-4 text-[#78C994]" />
      <span className="text-xs sm:text-sm font-semibold tracking-wide">
        {t.floatingWa.label}
      </span>
    </a>
  )
}
