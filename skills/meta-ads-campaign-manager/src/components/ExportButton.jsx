import toast from 'react-hot-toast'
import { OBJECTIVE_OPTIONS, STATUS_OPTIONS, BUDGET_TYPE_OPTIONS } from '../constants'

function label(options, value) {
  return options.find(o => o.value === value)?.label || value || '—'
}

function formatDate(d) {
  if (!d) return '—'
  return new Intl.DateTimeFormat('pt-BR').format(new Date(d + 'T00:00:00'))
}

function formatBudget(budget, budgetType) {
  if (!budget) return '—'
  const v = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(budget)
  return `${v} / ${label(BUDGET_TYPE_OPTIONS, budgetType)}`
}

function buildUrl(baseUrl, utmSource, utmMedium, utmCampaign) {
  if (!baseUrl) return ''
  try {
    const url = new URL(baseUrl)
    if (utmSource?.trim()) url.searchParams.set('utm_source', utmSource.trim())
    if (utmMedium?.trim()) url.searchParams.set('utm_medium', utmMedium.trim())
    if (utmCampaign?.trim()) url.searchParams.set('utm_campaign', utmCampaign.trim())
    return url.toString()
  } catch {
    return baseUrl
  }
}

function generateSummary(campaign, clientName, files) {
  const c = campaign
  const finalUrl = buildUrl(c.baseUrl, c.utmSource, c.utmMedium, c.utmCampaign)
  const checkItem = i => `  [${i.checked ? 'x' : ' '}] ${i.label}`

  const fileList = files.length > 0
    ? files.map(f => `  - ${f.name} (${(f.size / 1024).toFixed(0)} KB)`).join('\n')
    : '  (nenhum arquivo)'

  return `============================
RESUMO DA CAMPANHA
============================
Nome:         ${c.name || '—'}
Cliente:      ${clientName || '—'}
Status:       ${label(STATUS_OPTIONS, c.status)}
Objetivo:     ${label(OBJECTIVE_OPTIONS, c.objective)}
Orçamento:    ${formatBudget(c.budget, c.budgetType)}
Início:       ${formatDate(c.startDate)}
Fim:          ${formatDate(c.endDate)}
Público-alvo: ${c.targetAudience || '—'}

URL FINAL:
${finalUrl || '—'}

COPY DO ANÚNCIO:
${c.copyText || '—'}

HEADLINE:   ${c.headline || '—'}
DESCRIÇÃO:  ${c.description || '—'}
CTA:        ${c.cta || '—'}

----------------------------
CHECKLIST DO CLIENTE
----------------------------
${(c.checklistCliente || []).map(checkItem).join('\n') || '  (sem itens)'}

----------------------------
CHECKLIST DE PRÉ-LANÇAMENTO
----------------------------
${(c.checklistPreLancamento || []).map(checkItem).join('\n') || '  (sem itens)'}

----------------------------
ARQUIVOS ANEXADOS
----------------------------
${fileList}

NOTAS:
${c.notes || '—'}
============================
Gerado em: ${new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date())}
`
}

export default function ExportButton({ campaign, clientName, files }) {
  function handleCopy() {
    const text = generateSummary(campaign, clientName, files)
    navigator.clipboard.writeText(text)
    toast.success('Resumo copiado!')
  }

  function handleDownload() {
    const text = generateSummary(campaign, clientName, files)
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `campanha-${(campaign.name || 'sem-nome').replace(/\s+/g, '-').toLowerCase()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 100)
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={handleCopy}
        className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
      >
        Copiar Resumo
      </button>
      <button
        onClick={handleDownload}
        className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
      >
        Baixar .txt
      </button>
    </div>
  )
}
