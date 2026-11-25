import localLots from '../data/lots.json'

export type LotStatus = 'available' | 'reserved' | 'sold'

export type LotFeatureKey =
  | 'nearEntrance'
  | 'nearPool'
  | 'nearAlley'
  | 'quietLine'
  | 'mountainView'
  | 'cornerPlot'

export interface Lot {
  id: string
  number: number
  row: 'west' | 'east'
  position: number
  status: LotStatus
  landAreaSotok: number
  houseAreaTotal: number
  houseAreaLiving: number
  terraceArea: number
  purpose: string
  featureKey: LotFeatureKey
  priceKzt?: number | null
}

/**
 * Loads the 39 Apple Village cottage lots.
 *
 * Production Supabase integration:
 * Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Netlify Environment Variables.
 * Expected table schema in Supabase (`public.lots`):
 *   id text primary key (e.g. 'AV-01')
 *   number int not null
 *   row text not null check (row in ('west', 'east'))
 *   position int not null
 *   status text not null check (status in ('available', 'reserved', 'sold'))
 *   land_area_sotok numeric default 6
 *   house_area_total numeric default 169
 *   house_area_living numeric default 157
 *   terrace_area numeric default 32
 *   purpose text default 'ИЖС'
 *   feature_key text default 'quietLine'
 *   price_kzt bigint null
 */
export async function fetchLots(): Promise<{ lots: Lot[]; source: 'supabase' | 'local' }> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

  if (supabaseUrl && supabaseAnonKey) {
    try {
      const endpoint = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/lots?select=*&order=number.asc`
      const response = await fetch(endpoint, {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        const rows = (await response.json()) as Array<Record<string, unknown>>
        if (Array.isArray(rows) && rows.length > 0) {
          const mapped: Lot[] = rows.map((r) => ({
            id: String(r.id),
            number: Number(r.number),
            row: r.row === 'east' ? 'east' : 'west',
            position: Number(r.position),
            status: (r.status === 'sold' || r.status === 'reserved' ? r.status : 'available') as LotStatus,
            landAreaSotok: Number(r.land_area_sotok ?? 6),
            houseAreaTotal: Number(r.house_area_total ?? 169),
            houseAreaLiving: Number(r.house_area_living ?? 157),
            terraceArea: Number(r.terrace_area ?? 32),
            purpose: String(r.purpose ?? 'ИЖС'),
            featureKey: (r.feature_key as LotFeatureKey) || 'quietLine',
            priceKzt: r.price_kzt != null ? Number(r.price_kzt) : null,
          }))
          return { lots: mapped, source: 'supabase' }
        }
      }
    } catch {
      // Fall back gracefully to local JSON snapshot when offline or misconfigured
    }
  }

  return {
    lots: localLots as Lot[],
    source: 'local',
  }
}
