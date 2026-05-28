import { useMemo } from 'react'
import useAppStore from '../store/useAppStore'
import StatusBadge from '../components/StatusBadge'
import { OBJECTIVE_OPTIONS, STATUS_OPTIONS } from '../constants'
import toast from 'react-hot-toast'

function normalizeStr(s) {
  return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export default function CampaignList() {
  const campaigns = useAppStore(s => s.campaigns)
  const clients = useAppStore(s => s.clients)
  const searchText = useAppStore(s => s.searchText)
  const filterStatus = useAppStore(s => s.filterStatus)
  const filterObjective = useAppStore(s => s.filterObjective)
  const filterClientId = useAppStore(s => s.filterClientId)
  const setFilter = useAppStore(s => s.setFilter)
  const setSelectedCampaign = useAppStore(s => s.setSelectedCampaign)
  const deleteCampaign = useAppStore(s => s.deleteCampaign)
  const duplicateCampaign = useAppStore(s => s.duplicateCampaign)

  const clientMap = useMemo(() => {
    const m = {}
    clients.forEach(c => { m[c.id] = c.name })
    return m
  }, [clients])

  const filtered = useMemo(() => {
    const q = normalizeStr(searchText)
    return campaigns.filter(c => {
      if (filterStatus && c.status !== filterStatus) return false
      if (filterObjective && c.objective !== filterObjective) return false
      if (filterClientId && c.clientId !== filterClientId) return false
      if (q) {
        const name = normalizeStr(c.name)
        const client = normalizeStr(clientMap[c.clientId] || '')
        if (!name.includes(q) && !client.includes(q)) return false
      }
      return true
    })
  }, [campaigns, searchText, filterStatus, filterObjective, filterClientId, clientMap])

  async function handleDelete(id, name) {
    if (!window.confirm(`Excluir a campanha "${name}"? Esta ação não pode ser desfeita.`)) return
    await deleteCampaign(id)
    toast.success('Campanha excluída.')
  }

  async function handleDuplicate(id) {
    await duplicateCampaign(id)
    toast.success('Campanha duplicada.')
  }

  function formatBudget(c) {
    if (!c.budget) return '—'
    const v = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(c.budget)
    return `${v} / ${c.budgetType === 'diario' ? 'dia' : 'total'}`
  }

  function formatDate(d) {
    if (!d) return '—'
    return new Intl.DateTimeFormat('pt-BR').format(new Date(d + 'T00:00:00'))
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Campanhas</h2>
        <button
          onClick={() => setSelectedCampaign('new')}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Nova Campanha
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <input
          type="text"
          placeholder="Buscar por nome ou cliente..."
          value={searchText}
          onChange={e => setFilter('searchText', e.target.value)}
          className="col-span-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filterStatus}
          onChange={e => setFilter('filterStatus', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos os status</option>
          {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <select
          value={filterObjective}
          onChange={e => setFilter('filterObjective', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos os objetivos</option>
          {OBJECTIVE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <select
          value={filterClientId}
          onChange={e => setFilter('filterClientId', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos os clientes</option>
          {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          {campaigns.length === 0
            ? 'Nenhuma campanha cadastrada. Clique em "Nova Campanha" para começar.'
            : 'Nenhuma campanha encontrada com os filtros aplicados.'}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Objetivo</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Orçamento</th>
                <th className="px-4 py-3">Início</th>
                <th className="px-4 py-3">Fim</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedCampaign(c.id)}
                      className="font-medium text-blue-600 hover:text-blue-800 hover:underline text-left"
                    >
                      {c.name}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{clientMap[c.clientId] || '—'}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {OBJECTIVE_OPTIONS.find(o => o.value === c.objective)?.label || '—'}
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-3 text-gray-600">{formatBudget(c)}</td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(c.startDate)}</td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(c.endDate)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCampaign(c.id)}
                        className="text-xs text-blue-600 hover:underline"
                      >Editar</button>
                      <button
                        onClick={() => handleDuplicate(c.id)}
                        className="text-xs text-gray-500 hover:underline"
                      >Duplicar</button>
                      <button
                        onClick={() => handleDelete(c.id, c.name)}
                        className="text-xs text-red-500 hover:underline"
                      >Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
