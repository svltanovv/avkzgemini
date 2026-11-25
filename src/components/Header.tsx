import { useState, useEffect } from 'react'
import { Menu, Phone, X } from 'lucide-react'
import type { Translations } from '../i18n/translations'
import { SALES_PHONE_DISPLAY, SALES_PHONE_RAW, type Lang } from '../utils/whatsapp'

interface HeaderProps {
  lang: Lang
  onLangChange: (lang: Lang) => void
  t: Translations
  onBookViewingClick: (context: string) => void
}

export function Header({ lang, onLangChange, t, onBookViewingClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '#infrastructure', label: t.nav.infrastructure },
    { href: '#masterplan', label: t.nav.masterplan },
    { href: '#constructive', label: t.nav.constructive },
    { href: '#floorplans', label: t.nav.floorplans },
    { href: '#calculator', label: t.nav.calculator },
    { href: '#location', label: t.nav.location },
  ]

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-[#141816]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/15'
          : 'bg-gradient-to-b from-[#141816]/85 via-[#141816]/45 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand */}
        <a
          href="#top"
          data-track="header_logo_click"
          className="flex flex-col leading-none group shrink-0"
        >
          <span className="font-display text-lg sm:text-xl tracking-[0.14em] text-[#F6F4EF] font-medium group-hover:text-[#D5B883] transition-colors">
            APPLE VILLAGE
          </span>
          <span className="text-[10px] tracking-[0.22em] uppercase text-[#C9A96E]/90 mt-1">
            QZNA Development
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-track={`nav_${item.href.slice(1)}`}
              className="text-xs xl:text-[13px] tracking-wide text-[#E8E4DC]/85 hover:text-[#D5B883] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* RU / KZ Switcher */}
          <div
            className="inline-flex items-center rounded-full border border-white/15 bg-white/5 p-0.5 text-[11px] font-medium"
            role="group"
            aria-label="Language switcher"
          >
            <button
              type="button"
              onClick={() => onLangChange('ru')}
              data-track="lang_switch_ru"
              className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                lang === 'ru'
                  ? 'bg-[#C9A96E] text-[#141816] font-semibold'
                  : 'text-[#E8E4DC]/75 hover:text-white'
              }`}
            >
              RU
            </button>
            <button
              type="button"
              onClick={() => onLangChange('kz')}
              data-track="lang_switch_kz"
              className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                lang === 'kz'
                  ? 'bg-[#C9A96E] text-[#141816] font-semibold'
                  : 'text-[#E8E4DC]/75 hover:text-white'
              }`}
            >
              KZ
            </button>
          </div>

          {/* Phone */}
          <a
            href={`tel:${SALES_PHONE_RAW}`}
            data-track="header_phone_click"
            className="hidden md:inline-flex items-center gap-1.5 text-xs xl:text-sm font-medium text-[#F6F4EF] hover:text-[#D5B883] transition-colors whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>{SALES_PHONE_DISPLAY}</span>
          </a>

          {/* CTA */}
          <button
            type="button"
            onClick={() => onBookViewingClick('header_book_viewing')}
            data-track="header_book_viewing"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#C9A96E] hover:bg-[#D5B883] text-[#141816] text-xs font-semibold px-4 py-2 transition-colors cursor-pointer whitespace-nowrap"
          >
            {t.nav.bookViewing}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Menu"
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-[#F6F4EF] hover:bg-white/10 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 mt-3 px-4 pt-4 pb-6 bg-[#141816]">
          <nav className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                data-track={`mobile_nav_${item.href.slice(1)}`}
                className="text-base text-[#F6F4EF]/90 hover:text-[#D5B883] py-1.5 border-b border-white/5"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-3">
            <a
              href={`tel:${SALES_PHONE_RAW}`}
              data-track="mobile_menu_phone_click"
              className="flex items-center justify-center gap-2 rounded-full border border-white/20 py-2.5 text-sm font-medium text-[#F6F4EF]"
            >
              <Phone className="w-4 h-4 text-[#C9A96E]" />
              {SALES_PHONE_DISPLAY}
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false)
                onBookViewingClick('mobile_menu_book_viewing')
              }}
              data-track="mobile_menu_book_viewing"
              className="rounded-full bg-[#C9A96E] text-[#141816] py-2.5 text-sm font-semibold cursor-pointer"
            >
              {t.nav.bookViewing}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
