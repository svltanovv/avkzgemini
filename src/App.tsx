import { useEffect, useState } from 'react'
import { translations } from './i18n/translations'
import type { Lot } from './services/lotsService'
import type { Lang } from './utils/whatsapp'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { InfrastructureSection } from './components/InfrastructureSection'
import { MasterplanSection } from './components/MasterplanSection'
import { ConstructiveSection } from './components/ConstructiveSection'
import { FloorplansSection } from './components/FloorplansSection'
import { CalculatorSection } from './components/CalculatorSection'
import { LocationAndFormSection } from './components/LocationAndFormSection'
import { Footer } from './components/Footer'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'

export default function App() {
  const [lang, setLang] = useState<Lang>('ru')
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null)
  const [prefilledComment, setPrefilledComment] = useState<string>('')
  const [buttonContext, setButtonContext] = useState<string>('viewing_form_direct')

  const t = translations[lang]

  useEffect(() => {
    document.documentElement.lang = lang === 'kz' ? 'kk' : 'ru'
  }, [lang])

  const scrollToViewingForm = (context: string) => {
    setButtonContext(context)
    const el = document.getElementById('viewing')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSelectLotForViewing = (lot: Lot) => {
    setSelectedLot(lot)
    scrollToViewingForm(`masterplan_lot_${lot.id}`)
  }

  const handleRequestCalcSchedule = (summary: string) => {
    setPrefilledComment(summary)
    scrollToViewingForm('calculator_request_schedule')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F4EF] text-[#171A18]">
      <Header
        lang={lang}
        onLangChange={setLang}
        t={t}
        onBookViewingClick={scrollToViewingForm}
      />

      <main className="flex-1">
        <HeroSection t={t} onBookViewingClick={scrollToViewingForm} />
        <InfrastructureSection t={t} />
        <MasterplanSection
          lang={lang}
          t={t}
          onSelectLotForViewing={handleSelectLotForViewing}
        />
        <ConstructiveSection lang={lang} t={t} />
        <FloorplansSection lang={lang} t={t} />
        <CalculatorSection
          lang={lang}
          t={t}
          onRequestSchedule={handleRequestCalcSchedule}
        />
        <LocationAndFormSection
          lang={lang}
          t={t}
          selectedLot={selectedLot}
          onClearLot={() => setSelectedLot(null)}
          prefilledComment={prefilledComment}
          buttonContext={buttonContext}
        />
      </main>

      <Footer lang={lang} t={t} />
      <FloatingWhatsApp lang={lang} t={t} />
    </div>
  )
}
