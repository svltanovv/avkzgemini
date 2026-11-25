export const SALES_PHONE_RAW = '+77775862222'
export const SALES_PHONE_DISPLAY = '+7 777 586 2222'
export const WHATSAPP_NUMBER = '77775862222'
export const BOOKLET_URL = '/Apple-Village-Presentation.pdf'
export const BOOKLET_FILENAME = 'Буклет_Apple_Village.pdf'

export type Lang = 'ru' | 'kz'

/**
 * Builds a WhatsApp link to the QZNA Development sales office (+7 777 586 2222).
 * Always includes the exact phrase "Apple Village" so amoCRM auto-assigns the "Apple Village" tag.
 */
export function buildWhatsAppUrl(customText?: string, lang: Lang = 'ru'): string {
  const defaultText =
    lang === 'kz'
      ? 'Сәлеметсіз бе! Apple Village коттедж қалашығы бойынша ақпарат алғым келеді.'
      : 'Здравствуйте! Интересует коттедж в КГ Apple Village.'

  const rawText = (customText ?? defaultText).trim()
  const ensuredText = rawText.includes('Apple Village')
    ? rawText
    : `${rawText} (КГ Apple Village)`

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(ensuredText)}`
}

export function buildLotWhatsAppUrl(
  lotNumber: number,
  lotId: string,
  lang: Lang = 'ru',
  plotNumber?: number,
): string {
  const plotSuffix = plotNumber ? (lang === 'kz' ? `, уч. ${plotNumber}` : `, уч. ${plotNumber}`) : ''
  const text =
    lang === 'kz'
      ? `Сәлеметсіз бе! Apple Village коттедж қалашығындағы №${lotNumber}${plotSuffix} (${lotId}) үйінің бағасы мен шарттары қызықтырады.`
      : `Здравствуйте! Интересует коттедж №${lotNumber}${plotSuffix} (${lotId}) в КГ Apple Village. Подскажите, пожалуйста, актуальную стоимость и условия.`
  return buildWhatsAppUrl(text, lang)
}

export function buildCalcWhatsAppUrl(
  mode: 'installment' | 'mortgage',
  summary: string,
  lang: Lang = 'ru',
): string {
  const text =
    lang === 'kz'
      ? `Сәлеметсіз бе! Apple Village коттедж қалашығы бойынша ${mode === 'installment' ? '0% бөліп төлеу' : 'ипотека'} есебі қызықтырады: ${summary}`
      : `Здравствуйте! Интересует расчёт ${mode === 'installment' ? 'рассрочки 0%' : 'ипотеки'} в КГ Apple Village: ${summary}`
  return buildWhatsAppUrl(text, lang)
}
