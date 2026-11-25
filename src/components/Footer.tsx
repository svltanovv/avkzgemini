import { FileDown, MessageCircle, Phone } from 'lucide-react'
import type { Translations } from '../i18n/translations'
import {
  BOOKLET_FILENAME,
  BOOKLET_URL,
  SALES_PHONE_DISPLAY,
  SALES_PHONE_RAW,
  buildWhatsAppUrl,
  type Lang,
} from '../utils/whatsapp'

interface FooterProps {
  lang: Lang
  t: Translations
}

export function Footer({ lang, t }: FooterProps) {
  return (
    <footer className="bg-[#111513] text-[#E4DFD5] border-t border-white/10 pt-12 pb-24 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          <div className="md:col-span-6 space-y-3">
            <div>
              <div className="font-display text-xl tracking-[0.14em] text-[#F6F4EF]">
                APPLE VILLAGE
              </div>
              <div className="text-[11px] tracking-[0.22em] uppercase text-[#C9A96E] mt-1">
                QZNA Development
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#A8A69F] max-w-md leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          <div className="md:col-span-6 flex flex-col sm:flex-row sm:items-start md:justify-end gap-6 sm:gap-10">
            <div className="space-y-2.5">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#C9A96E]">
                {t.footer.salesOffice}
              </div>
              <a
                href={`tel:${SALES_PHONE_RAW}`}
                data-track="footer_phone_click"
                className="flex items-center gap-2 text-base font-semibold text-[#F6F4EF] hover:text-[#D5B883] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C9A96E]" />
                <span>{SALES_PHONE_DISPLAY}</span>
              </a>
              <a
                href={buildWhatsAppUrl(undefined, lang)}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_footer"
                className="inline-flex items-center gap-2 text-xs text-[#A8C9B5] hover:text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp · Apple Village</span>
              </a>
            </div>

            <div className="space-y-2.5">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#C9A96E]">PDF</div>
              <a
                href={BOOKLET_URL}
                download={BOOKLET_FILENAME}
                target="_blank"
                rel="noopener noreferrer"
                data-track="pdf_download_footer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 hover:border-[#C9A96E]/60 px-4 py-2 text-xs font-medium text-[#F6F4EF] transition-colors"
              >
                <FileDown className="w-3.5 h-3.5 text-[#D5B883]" />
                <span>{t.footer.downloadPdf}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-[#7D7C76]">
          <div>
            © {new Date().getFullYear()} {t.footer.rights} · applevillage.kz
          </div>
          <div>{t.footer.disclaimer}</div>
        </div>
      </div>
    </footer>
  )
}
