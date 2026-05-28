import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'

function buildUrl(baseUrl, utmSource, utmMedium, utmCampaign) {
  try {
    const url = new URL(baseUrl)
    if ((utmSource ?? '').trim()) url.searchParams.set('utm_source', utmSource.trim())
    if ((utmMedium ?? '').trim()) url.searchParams.set('utm_medium', utmMedium.trim())
    if ((utmCampaign ?? '').trim()) url.searchParams.set('utm_campaign', utmCampaign.trim())
    return { url: url.toString(), error: null }
  } catch {
    return { url: null, error: 'URL base inválida. Verifique o formato (ex: https://seusite.com).' }
  }
}

export default function UrlBuilder({ form, onChange, onSave }) {
  const { url: finalUrl, error } = useMemo(
    () => buildUrl(form.baseUrl, form.utmSource, form.utmMedium, form.utmCampaign),
    [form.baseUrl, form.utmSource, form.utmMedium, form.utmCampaign]
  )

  function field(label, key, placeholder) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
          type="text"
          value={form[key]}
          onChange={e => onChange(key, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
        />
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {field('URL Base *', 'baseUrl', 'https://seusite.com/pagina')}
      <div className="grid grid-cols-3 gap-4">
        {field('utm_source', 'utmSource', 'facebook')}
        {field('utm_medium', 'utmMedium', 'cpc')}
        {field('utm_campaign', 'utmCampaign', 'black-friday-2026')}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">URL Final</label>
        {error ? (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>
        ) : finalUrl ? (
          <div className="flex gap-2">
            <code className="flex-1 block bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 break-all font-mono">
              {finalUrl}
            </code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(finalUrl)
                toast.success('URL copiada!')
              }}
              className="shrink-0 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors"
            >
              Copiar
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic">Preencha a URL base para gerar a URL final.</p>
        )}
      </div>
      {onSave && (
        <div className="flex justify-end">
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Salvar URL
          </button>
        </div>
      )}
    </div>
  )
}
