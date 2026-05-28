import { useState, useMemo } from 'react'
import useAppStore from '../store/useAppStore'
import toast from 'react-hot-toast'

function emptyForm() {
  return { id: null, name: '', contact: '', notes: '' }
}

export default function ClientList() {
  const clients = useAppStore(s => s.clients)
  const campaigns = useAppStore(s => s.campaigns)
  const saveClient = useAppStore(s => s.saveClient)
  const deleteClient = useAppStore(s => s.deleteClient)
  const setActiveSection = useAppStore(s => s.setActiveSection)
  const setFilter = useAppStore(s => s.setFilter)

  const [form, setForm] = useState(emptyForm())
  const [showForm, setShowForm] = useState(false)

  const campaignCounts = useMemo(() => {
    const counts = {}
    campaigns.forEach(c => {
      counts[c.clientId] = (counts[c.clientId] || 0) + 1
    })
    return counts
  }, [campaigns])

  function startNew() {
    setForm(emptyForm())
    setShowForm(true)
  }

  function startEdit(client) {
    setForm({ id: client.id, name: client.name, contact: client.contact || '', notes: client.notes || '' })
    setShowForm(true)
  }

  function cancelForm() {
    setForm(emptyForm())
    setShowForm(false)
  }

  async function handleSave() {
    if (!form.name.trim()) { toast.error('O nome do cliente é obrigatório.'); return }
    try {
      const id = form.id || crypto.randomUUID()
      await saveClient({ ...form, id })
      toast.success(form.id ? 'Cliente atualizado.' : 'Cliente criado.')
      cancelForm()
    } catch {}
  }

  async function handleDelete(client) {
    const result = await deleteClient(client.id)
    if (result?.blocked) {
      toast.error(`Não é possível excluir "${client.name}": há ${result.count} campanha(s) vinculada(s). Exclua ou reatribua as campanhas antes.`)
      return
    }
    toast.success('Cliente excluído.')
  }

  function viewCampaigns(clientId) {
    setFilter('filterClientId', clientId)
    setActiveSection('campanhas')
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Clientes</h2>
        <button
          onClick={startNew}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Novo Cliente
        </button>
      </div>

      {/* Inline form */}
      {showForm && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            {form.id ? 'Editar Cliente' : 'Novo Cliente'}
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                autoFocus
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nome do cliente ou empresa"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contato</label>
              <input
                type="text"
                value={form.contact}
                onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="E-mail ou WhatsApp"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
              <input
                type="text"
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Notas sobre o cliente..."
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={cancelForm} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Cancelar</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Salvar
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      {clients.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          Nenhum cliente cadastrado. Clique em "Novo Cliente" para começar.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Contato</th>
                <th className="px-4 py-3">Campanhas</th>
                <th className="px-4 py-3">Observações</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {clients.map(client => (
                <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800">{client.name}</td>
                  <td className="px-4 py-3 text-gray-600">{client.contact || '—'}</td>
                  <td className="px-4 py-3">
                    {campaignCounts[client.id] ? (
                      <button
                        onClick={() => viewCampaigns(client.id)}
                        className="text-blue-600 hover:underline text-xs"
                      >
                        {campaignCounts[client.id]} campanha(s)
                      </button>
                    ) : (
                      <span className="text-gray-400 text-xs">0</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{client.notes || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(client)} className="text-xs text-blue-600 hover:underline">Editar</button>
                      <button onClick={() => handleDelete(client)} className="text-xs text-red-500 hover:underline">Excluir</button>
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
