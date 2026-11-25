import { useMemo, useState } from 'react'
import { Calculator, Calendar, MessageCircle } from 'lucide-react'
import type { Translations } from '../i18n/translations'
import { buildCalcWhatsAppUrl, type Lang } from '../utils/whatsapp'

interface CalculatorSectionProps {
  lang: Lang
  t: Translations
  onRequestSchedule: (summary: string) => void
}

function formatKzt(value: number): string {
  return `${Math.round(value).toLocaleString('ru-RU')} ₸`
}

export function CalculatorSection({ lang, t, onRequestSchedule }: CalculatorSectionProps) {
  const [mode, setMode] = useState<'installment' | 'mortgage'>('installment')
  const [priceMln, setPriceMln] = useState<number>(115)
  const [downPaymentPct, setDownPaymentPct] = useState<number>(30)
  const [installmentMonths, setInstallmentMonths] = useState<number>(12)
  const [mortgageYears, setMortgageYears] = useState<number>(15)
  const [mortgageRate, setMortgageRate] = useState<number>(16.5)

  const handleModeSwitch = (nextMode: 'installment' | 'mortgage') => {
    setMode(nextMode)
    if (nextMode === 'installment' && downPaymentPct < 30) {
      setDownPaymentPct(30)
    }
  }

  const calc = useMemo(() => {
    const totalPrice = priceMln * 1_000_000
    const effectiveDpPct = mode === 'installment' ? Math.max(30, downPaymentPct) : downPaymentPct
    const downPayment = (totalPrice * effectiveDpPct) / 100
    const remainder = Math.max(0, totalPrice - downPayment)

    if (mode === 'installment') {
      const monthly = remainder / installmentMonths
      return {
        totalPrice,
        effectiveDpPct,
        downPayment,
        remainder,
        monthly,
        overpayment: 0,
      }
    }

    const monthlyRate = mortgageRate / 100 / 12
    const n = mortgageYears * 12
    const factor = Math.pow(1 + monthlyRate, n)
    const monthly = monthlyRate > 0 ? (remainder * (monthlyRate * factor)) / (factor - 1) : remainder / n
    const overpayment = Math.max(0, monthly * n - remainder)

    return {
      totalPrice,
      effectiveDpPct,
      downPayment,
      remainder,
      monthly,
      overpayment,
    }
  }, [mode, priceMln, downPaymentPct, installmentMonths, mortgageYears, mortgageRate])

  const summaryString =
    mode === 'installment'
      ? `${priceMln} млн ₸, ПВ ${calc.effectiveDpPct}% (${formatKzt(calc.downPayment)}), срок ${installmentMonths} мес., платёж ~${formatKzt(calc.monthly)}/мес (0%)`
      : `${priceMln} млн ₸, ПВ ${calc.effectiveDpPct}% (${formatKzt(calc.downPayment)}), ${mortgageYears} лет под ${mortgageRate}%, платёж ~${formatKzt(calc.monthly)}/мес`

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-[#ECE8DF]/70 border-b border-[#171A18]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs tracking-[0.2em] uppercase text-[#8A6D3B] font-semibold">
              {t.calculator.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] leading-[1.15] text-[#171A18]">
              {t.calculator.title}
            </h2>
            <p className="text-sm sm:text-base text-[#525753] leading-relaxed">
              {t.calculator.subtitle}
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="inline-flex rounded-full bg-white p-1 border border-[#171A18]/10 self-start lg:self-end shadow-xs">
            <button
              type="button"
              onClick={() => handleModeSwitch('installment')}
              data-track="calc_mode_installment"
              className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                mode === 'installment'
                  ? 'bg-[#1B332A] text-[#F6F4EF]'
                  : 'text-[#474C48] hover:text-[#171A18]'
              }`}
            >
              {t.calculator.modeInstallment}
            </button>
            <button
              type="button"
              onClick={() => handleModeSwitch('mortgage')}
              data-track="calc_mode_mortgage"
              className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                mode === 'mortgage'
                  ? 'bg-[#1B332A] text-[#F6F4EF]'
                  : 'text-[#474C48] hover:text-[#171A18]'
              }`}
            >
              {t.calculator.modeMortgage}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          {/* Sliders Panel */}
          <div className="lg:col-span-7 rounded-3xl bg-[#FBF9F5] border border-[#171A18]/10 p-6 sm:p-8 space-y-7">
            {/* Property Price */}
            <div className="space-y-3">
              <div className="flex items-baseline justify-between gap-2">
                <label htmlFor="calc-price" className="text-sm font-medium text-[#2A2E2B]">
                  {t.calculator.priceLabel}
                </label>
                <span className="font-display text-xl sm:text-2xl text-[#1B332A] font-semibold">
                  {formatKzt(calc.totalPrice)}
                </span>
              </div>
              <input
                id="calc-price"
                type="range"
                min={85}
                max={160}
                step={5}
                value={priceMln}
                onChange={(e) => setPriceMln(Number(e.target.value))}
                data-track="calc_price_change"
                className="av-range"
              />
              <div className="flex items-center justify-between text-[11px] text-[#7A7D79]">
                <span>85 млн ₸</span>
                <span>{t.calculator.priceHint}</span>
                <span>160 млн ₸</span>
              </div>
            </div>

            {/* Down Payment */}
            <div className="space-y-3">
              <div className="flex items-baseline justify-between gap-2">
                <label htmlFor="calc-dp" className="text-sm font-medium text-[#2A2E2B]">
                  {t.calculator.downPaymentLabel}
                </label>
                <div className="text-right">
                  <span className="font-display text-xl sm:text-2xl text-[#171A18] font-semibold">
                    {calc.effectiveDpPct}%
                  </span>
                  <span className="text-xs text-[#6E726E] ml-2">
                    ({formatKzt(calc.downPayment)})
                  </span>
                </div>
              </div>
              <input
                id="calc-dp"
                type="range"
                min={mode === 'installment' ? 30 : 20}
                max={80}
                step={5}
                value={calc.effectiveDpPct}
                onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                data-track="calc_downpayment_change"
                className="av-range"
              />
              <div className="flex items-center justify-between text-[11px] text-[#7A7D79]">
                <span>{mode === 'installment' ? '30% (мин.)' : '20%'}</span>
                <span>50%</span>
                <span>80%</span>
              </div>
            </div>

            {/* Term */}
            {mode === 'installment' ? (
              <div className="space-y-3">
                <div className="flex items-baseline justify-between gap-2">
                  <label htmlFor="calc-months" className="text-sm font-medium text-[#2A2E2B]">
                    {t.calculator.termMonthsLabel}
                  </label>
                  <span className="font-display text-xl sm:text-2xl text-[#171A18] font-semibold">
                    {installmentMonths} {t.calculator.monthsUnit}
                  </span>
                </div>
                <input
                  id="calc-months"
                  type="range"
                  min={3}
                  max={12}
                  step={1}
                  value={installmentMonths}
                  onChange={(e) => setInstallmentMonths(Number(e.target.value))}
                  data-track="calc_term_installment_change"
                  className="av-range"
                />
                <div className="flex items-center justify-between text-[11px] text-[#7A7D79]">
                  <span>3 {t.calculator.monthsUnit}</span>
                  <span>6 {t.calculator.monthsUnit}</span>
                  <span>12 {t.calculator.monthsUnit} (0%)</span>
                </div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <label htmlFor="calc-years" className="text-sm font-medium text-[#2A2E2B]">
                      {t.calculator.termYearsLabel}
                    </label>
                    <span className="font-display text-xl text-[#171A18] font-semibold">
                      {mortgageYears} {t.calculator.yearsUnit}
                    </span>
                  </div>
                  <input
                    id="calc-years"
                    type="range"
                    min={5}
                    max={20}
                    step={1}
                    value={mortgageYears}
                    onChange={(e) => setMortgageYears(Number(e.target.value))}
                    data-track="calc_term_mortgage_change"
                    className="av-range"
                  />
                  <div className="flex items-center justify-between text-[11px] text-[#7A7D79]">
                    <span>5 {t.calculator.yearsUnit}</span>
                    <span>20 {t.calculator.yearsUnit}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <label htmlFor="calc-rate" className="text-sm font-medium text-[#2A2E2B]">
                      {t.calculator.rateLabel}
                    </label>
                    <span className="font-display text-xl text-[#171A18] font-semibold">
                      {mortgageRate.toFixed(1)}%
                    </span>
                  </div>
                  <input
                    id="calc-rate"
                    type="range"
                    min={7}
                    max={21}
                    step={0.5}
                    value={mortgageRate}
                    onChange={(e) => setMortgageRate(Number(e.target.value))}
                    data-track="calc_rate_change"
                    className="av-range"
                  />
                  <div className="flex items-center justify-between text-[11px] text-[#7A7D79]">
                    <span>7%</span>
                    <span>16.5%</span>
                    <span>21%</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Summary Card */}
          <div className="lg:col-span-5 rounded-3xl bg-[#1B332A] text-[#F6F4EF] p-6 sm:p-8 flex flex-col justify-between gap-6 border border-[#2A4D3E]">
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#D5B883]">
                <Calculator className="w-4 h-4" />
                <span>
                  {mode === 'installment'
                    ? t.calculator.resultTitleInstallment
                    : t.calculator.resultTitleMortgage}
                </span>
              </div>

              <div className="pb-5 border-b border-white/12">
                <div className="text-xs text-[#DCE3DF]/75">{t.calculator.monthlyPayment}</div>
                <div className="font-display text-3xl sm:text-4xl text-[#F6F4EF] mt-1">
                  {formatKzt(calc.monthly)}
                </div>
              </div>

              <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#DCE3DF]/75">{t.calculator.downPaymentAmount}</dt>
                  <dd className="font-semibold text-[#F6F4EF]">{formatKzt(calc.downPayment)}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#DCE3DF]/75">{t.calculator.remainderAmount}</dt>
                  <dd className="font-semibold text-[#F6F4EF]">{formatKzt(calc.remainder)}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#DCE3DF]/75">{t.calculator.overpayment}</dt>
                  <dd className="font-semibold text-[#D5B883]">
                    {mode === 'installment'
                      ? t.calculator.zeroOverpayment
                      : formatKzt(calc.overpayment)}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => onRequestSchedule(summaryString)}
                data-track="calc_request_schedule"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A96E] hover:bg-[#D8BB84] text-[#141816] font-semibold text-sm py-3.5 px-5 transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.calculator.ctaRequestSchedule}</span>
              </button>

              <a
                href={buildCalcWhatsAppUrl(mode, summaryString, lang)}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_calc_inquiry"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/20 hover:bg-white/8 text-[#F6F4EF] font-medium text-sm py-3 px-5 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#78C994]" />
                <span>{t.calculator.ctaWhatsAppCalc}</span>
              </a>

              <p className="text-[11px] text-[#DCE3DF]/60 leading-relaxed pt-1">
                {t.calculator.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
