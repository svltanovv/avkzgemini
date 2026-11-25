import type { Context } from '@netlify/functions'

interface LeadRequestPayload {
  name?: string
  phone?: string
  comment?: string
  lotId?: string
  buttonContext?: string
  lang?: string
  pageUrl?: string
  // Honeypot field: must remain empty for real visitors
  website?: string
  utm?: {
    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
    utm_content?: string
    utm_term?: string
  }
  clientIds?: {
    ymClientId?: string
    gaClientId?: string
  }
}

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  })
}

function buildCustomFields(payload: LeadRequestPayload) {
  const mapping: Array<[string, string | undefined]> = [
    ['AMOCRM_CF_UTM_SOURCE', payload.utm?.utm_source],
    ['AMOCRM_CF_UTM_MEDIUM', payload.utm?.utm_medium],
    ['AMOCRM_CF_UTM_CAMPAIGN', payload.utm?.utm_campaign],
    ['AMOCRM_CF_UTM_CONTENT', payload.utm?.utm_content],
    ['AMOCRM_CF_UTM_TERM', payload.utm?.utm_term],
    ['AMOCRM_CF_YM_CLIENT_ID', payload.clientIds?.ymClientId],
    ['AMOCRM_CF_GA_CLIENT_ID', payload.clientIds?.gaClientId],
    ['AMOCRM_CF_LOT_ID', payload.lotId],
    ['AMOCRM_CF_BUTTON_CONTEXT', payload.buttonContext],
  ]

  const fields: Array<{ field_id: number; values: Array<{ value: string }> }> = []

  for (const [envKey, value] of mapping) {
    const fieldIdRaw = Netlify.env.get(envKey)
    if (fieldIdRaw && /^\d+$/.test(fieldIdRaw) && value) {
      fields.push({
        field_id: Number(fieldIdRaw),
        values: [{ value: value.slice(0, 250) }],
      })
    }
  }

  return fields
}

export default async (req: Request, context: Context): Promise<Response> => {
  if (req.method !== 'POST') {
    return jsonResponse({ ok: false, error: 'Method Not Allowed' }, 405)
  }

  let payload: LeadRequestPayload
  try {
    payload = (await req.json()) as LeadRequestPayload
  } catch {
    return jsonResponse({ ok: false, error: 'Invalid JSON payload' }, 400)
  }

  // Honeypot anti-spam trap: silently accept and discard bot submissions
  if (payload.website && payload.website.trim().length > 0) {
    return jsonResponse({ ok: true, status: 'accepted' }, 200)
  }

  const name = (payload.name ?? '').trim().slice(0, 120)
  const phone = (payload.phone ?? '').trim().slice(0, 40)
  const digitsOnly = phone.replace(/\D/g, '')

  if (!name || digitsOnly.length < 10) {
    return jsonResponse({ ok: false, error: 'Valid name and phone are required' }, 422)
  }

  const subdomain = Netlify.env.get('AMOCRM_SUBDOMAIN')
  const accessToken = Netlify.env.get('AMOCRM_ACCESS_TOKEN')
  const pipelineIdRaw = Netlify.env.get('AMOCRM_PIPELINE_ID')
  const statusIdRaw = Netlify.env.get('AMOCRM_STATUS_ID')

  const leadName = payload.lotId
    ? `Apple Village — Заявка (${payload.lotId}) — ${name}`
    : `Apple Village — Заявка с сайта — ${name}`

  const noteLines = [
    `Заявка с сайта applevillage.kz`,
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    payload.lotId ? `Выбранный лот: ${payload.lotId}` : null,
    payload.buttonContext ? `Контекст кнопки/формы: ${payload.buttonContext}` : null,
    payload.comment ? `Комментарий: ${payload.comment.trim().slice(0, 500)}` : null,
    payload.lang ? `Язык сайта: ${payload.lang.toUpperCase()}` : null,
    payload.utm?.utm_source ? `utm_source: ${payload.utm.utm_source}` : null,
    payload.utm?.utm_medium ? `utm_medium: ${payload.utm.utm_medium}` : null,
    payload.utm?.utm_campaign ? `utm_campaign: ${payload.utm.utm_campaign}` : null,
    payload.utm?.utm_content ? `utm_content: ${payload.utm.utm_content}` : null,
    payload.utm?.utm_term ? `utm_term: ${payload.utm.utm_term}` : null,
    payload.clientIds?.ymClientId ? `Yandex Metrika ClientID: ${payload.clientIds.ymClientId}` : null,
    payload.clientIds?.gaClientId ? `GA4 ClientID: ${payload.clientIds.gaClientId}` : null,
    payload.pageUrl ? `Страница: ${payload.pageUrl}` : null,
    context.ip ? `IP: ${context.ip}` : null,
  ].filter(Boolean)

  // MVP fallback when amoCRM credentials have not yet been configured in Netlify Env Vars
  if (!subdomain || !accessToken) {
    console.log('[submit-lead][dry-run] amoCRM credentials not configured yet:', {
      leadName,
      phone,
      lotId: payload.lotId ?? null,
      buttonContext: payload.buttonContext ?? null,
      utm: payload.utm ?? {},
      clientIds: payload.clientIds ?? {},
    })
    return jsonResponse({
      ok: true,
      mode: 'dry-run',
      message: 'Lead accepted (configure AMOCRM_SUBDOMAIN and AMOCRM_ACCESS_TOKEN in Netlify to forward to amoCRM v4)',
    })
  }

  const baseUrl = `https://${subdomain.replace(/^https?:\/\//, '').replace(/\.amocrm\..*$/, '')}.amocrm.ru`
  const customFields = buildCustomFields(payload)

  const complexLeadBody: Array<Record<string, unknown>> = [
    {
      name: leadName,
      ...(pipelineIdRaw && /^\d+$/.test(pipelineIdRaw) ? { pipeline_id: Number(pipelineIdRaw) } : {}),
      ...(statusIdRaw && /^\d+$/.test(statusIdRaw) ? { status_id: Number(statusIdRaw) } : {}),
      ...(customFields.length > 0 ? { custom_fields_values: customFields } : {}),
      _embedded: {
        tags: [{ name: 'Apple Village' }, { name: 'applevillage.kz' }],
        contacts: [
          {
            name,
            custom_fields_values: [
              {
                field_code: 'PHONE',
                values: [{ value: phone, enum_code: 'MOB' }],
              },
            ],
          },
        ],
      },
    },
  ]

  try {
    const createRes = await fetch(`${baseUrl}/api/v4/leads/complex`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(complexLeadBody),
    })

    if (!createRes.ok) {
      const errorText = await createRes.text()
      console.error('[submit-lead] amoCRM complex lead failed:', createRes.status, errorText)
      return jsonResponse({ ok: false, error: 'CRM integration error' }, 502)
    }

    const created = (await createRes.json()) as Array<{ id?: number }>
    const leadId = created?.[0]?.id

    if (leadId) {
      await fetch(`${baseUrl}/api/v4/leads/${leadId}/notes`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            note_type: 'common',
            params: {
              text: noteLines.join('\n'),
            },
          },
        ]),
      })
    }

    return jsonResponse({ ok: true, mode: 'amocrm', leadId: leadId ?? null }, 200)
  } catch (err) {
    console.error('[submit-lead] Unexpected error calling amoCRM:', err)
    return jsonResponse({ ok: false, error: 'Upstream CRM request failed' }, 502)
  }
}
