declare global {
  interface Window {
    ym?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
    dataLayer?: Array<Record<string, unknown>>
  }
}

export interface UtmPayload {
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
}

export interface ClientIds {
  ymClientId: string
  gaClientId: string
}

const UTM_STORAGE_KEY = 'av_utm_params_v1'
const UTM_KEYS: Array<keyof UtmPayload> = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
]

export function captureUtmParams(): UtmPayload {
  const params = new URLSearchParams(window.location.search)
  const existing = getStoredUtmParams()
  const updated: UtmPayload = { ...existing }
  let changed = false

  for (const key of UTM_KEYS) {
    const val = params.get(key)
    if (val) {
      updated[key] = val.slice(0, 200)
      changed = true
    }
  }

  if (changed) {
    try {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(updated))
    } catch {
      // ignore storage restrictions
    }
  }
  return updated
}

export function getStoredUtmParams(): UtmPayload {
  const empty: UtmPayload = {
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
  }
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY)
    if (!raw) return empty
    const parsed = JSON.parse(raw) as Partial<UtmPayload>
    return { ...empty, ...parsed }
  } catch {
    return empty
  }
}

function readCookie(name: string): string {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : ''
}

export function getClientIds(): ClientIds {
  const ymClientId = readCookie('_ym_uid')
  const gaRaw = readCookie('_ga')
  // Standard GA4 _ga cookie looks like GA1.1.123456789.1700000000
  const gaParts = gaRaw.split('.')
  const gaClientId = gaParts.length >= 4 ? `${gaParts[2]}.${gaParts[3]}` : gaRaw
  return { ymClientId, gaClientId }
}

export function initAnalytics(): void {
  const ymIdRaw = import.meta.env.VITE_YM_ID as string | undefined
  const gaId = import.meta.env.VITE_GA_ID as string | undefined

  window.dataLayer = window.dataLayer || []

  if (ymIdRaw && /^\d+$/.test(ymIdRaw.trim())) {
    const ymId = Number(ymIdRaw.trim())
    ;(function (m: Window, e: Document, t: string, r: string) {
      const fn = function (...args: unknown[]) {
        ;(fn as unknown as { a: unknown[] }).a = (fn as unknown as { a: unknown[] }).a || []
        ;(fn as unknown as { a: unknown[] }).a.push(args)
      }
      ;(fn as unknown as { l: number }).l = Date.now()
      m.ym = m.ym || fn
      const script = e.createElement(t) as HTMLScriptElement
      script.async = true
      script.src = r
      e.head.appendChild(script)
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js')

    window.ym?.(ymId, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    })
  }

  if (gaId && gaId.trim().startsWith('G-')) {
    const cleanGaId = gaId.trim()
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(cleanGaId)}`
    document.head.appendChild(script)

    window.gtag = function (...args: unknown[]) {
      window.dataLayer?.push({ event: 'gtag_call', args })
    }
    window.gtag('js', new Date())
    window.gtag('config', cleanGaId)
  }
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}): void {
  const ymIdRaw = import.meta.env.VITE_YM_ID as string | undefined
  const payload = {
    ...params,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
  }

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: eventName, ...payload })

  if (ymIdRaw && /^\d+$/.test(ymIdRaw.trim()) && typeof window.ym === 'function') {
    window.ym(Number(ymIdRaw.trim()), 'reachGoal', eventName, payload)
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload)
  }
}

let trackingInstalled = false

/**
 * Delegated listener for all elements annotated with data-track and optional data-lot-id.
 */
export function installGlobalTracking(): void {
  if (trackingInstalled) return
  trackingInstalled = true

  document.addEventListener(
    'click',
    (event) => {
      const target = event.target as HTMLElement | null
      const trackedEl = target?.closest<HTMLElement>('[data-track]')
      if (!trackedEl) return

      const trackName = trackedEl.dataset.track
      if (!trackName) return

      const lotId = trackedEl.dataset.lotId
      const href = trackedEl instanceof HTMLAnchorElement ? trackedEl.href : undefined

      trackEvent(trackName, {
        ...(lotId ? { lot_id: lotId } : {}),
        ...(href ? { link_url: href } : {}),
      })
    },
    { passive: true },
  )
}
