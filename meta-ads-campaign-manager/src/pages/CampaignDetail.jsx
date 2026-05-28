import { useState, useEffect, useMemo } from 'react'
import useAppStore from '../store/useAppStore'
import { OBJECTIVE_OPTIONS, STATUS_OPTIONS, BUDGET_TYPE_OPTIONS, createDefaultChecklistCliente, createDefaultChecklistPreLancamento } from '../constants'
import ChecklistPanel from '../components/ChecklistPanel'
import FileUpload from '../components/FileUpload'
import UrlBuilder from '../components/UrlBuilder'
import ExportButton from '../components/ExportButton'
import { getFilesForCampaign } from '../db'
import toast from 'react-hot-toast'

const TABS = [
  { id: 'dados', label: 'Dados Gerais' },
  { id: 'url', label: 'URL & UTMs' },
  { id: 'materiais', label: 'Materiais' },
  { id: 'checklists', label: 'Checklists' },
]

function emptyForm() {
  return {
    name: '',
    clientId: '',
    objective: 'trafego',
    status: 'rascunho',
    budget: '',
    budgetType: 'diario',
    startDate: '',
    endDate: '',
    targetAudience: '',
    notes: '',
    baseUrl: '',
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
    copyText: '',
    headline: '',
    description: '',
    cta: '',
    checklistCliente: createDefaultChecklistCliente(),
    checklistPreLancamento: createDefaultChecklistPreLancamento(),
  }
}

export default function CampaignDetail() {
  const selectedId = useAppStore(s => s.selectedCampaignId)
  const campaigns = useAppStore(s => s.campaigns)
  const clients = useAppStore(s => s.clients)
  const selectedTab = useAppStore(s => s.selectedTab)
  const setSelectedTab = useAppStore(s => s.setSelectedTab)
  const setSelectedCampaign = useAppStore(s => s.setSelectedCampaign)
  const saveCampaign = useAppStore(s => s.saveCampaign)

  const isNew = selectedId === 'new'
  const campaign = isNew ? null : campaigns.find(c => c.id === selectedId)

  const [form, setForm] = useState(() => isNew ? emptyForm() : { ...emptyForm(), ...(campaign || {}) })
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  const [files, setFiles] = useState([])

  useEffect(() => {
    if (!isNew && campaign) {
      setForm({ ...emptyForm(), ...campaign })
      setDirty(false)
    }
  }, [selectedId, isNew])

  useEffect(() => {
    if (!isNew && selectedId && selectedId !== 'new') {
      getFilesForCampaign(selectedId).then(setFiles).catch(() => {})
    } else {
      setFiles([])
    }
  }, [selectedId, isNew])

  function updateField(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    setDirty(true)
  }

  async function handleSave() {
    if (!form.name.trim()) { toast.error('O nome da campanha é obrigatório.'); return }
    if (!form.clientId) { toast.error('Selecione um cliente.'); return }
    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      toast.error('A data de fim deve ser igual ou posterior à data de início.'); return
    }

    setSaving(true)
    try {
      const id = isNew ? crypto.randomUUID() : selectedId
      const saved = await saveCampaign({ ...form, id })
      setDirty(false)
      if (isNew) {
        useAppStore.setState({ selectedCampaignId: saved.id })
        window.location.hash = `#/campanhas/${saved.id}`
      }
      toast.success('Campanha salva com sucesso!')
    } catch (e) {
      // error already toasted in store
    } finally {
      setSaving(false)
    }
  }

  async function handleChecklistChange(field, newItems) {
    const updated = { ...form, [field]: newItems }
    setForm(updated)
    setDirty(false)
    if (!isNew) {
      try {
        const id = selectedId
        await saveCampaign({ ...updated, id })
      } catch {}
    }
  }

  const clientName = clients.find(c => c.id === form.clientId)?.name || ''

  return (
    <div className="p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setSelectedCampaign(null)}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
          title="Voltar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-semibold text-gray-900 flex-1">
          {isNew ? 'Nova Campanha' : form.name || 'Campanha'}
          {dirty && <span className="ml-2 text-sm text-orange-500 font-normal">● não salvo</span>}
        </h2>
        {!isNew && <ExportButton campaign={form} clientName={clientName} files={files} />}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              if (dirty && tab.id !== selectedTab) {
                if (!window.confirm('Há alterações não salvas. Deseja continuar sem salvar?')) return
                setDirty(false)
              }
              setSelectedTab(tab.id)
            }}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              selectedTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Dados Gerais */}
      {selectedTab === 'dados' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Campanha *</label>
              <input
                type="text"
                value={form.name}
                onChange={e => updateField('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Black Friday 2026 — Conversão"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cliente *</label>
              <select
                value={form.clientId}
                onChange={e => updateField('clientId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione um cliente</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Objetivo</label>
              <select
                value={form.objective}
                onChange={e => updateField('objective', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {OBJECTIVE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={form.status}
                onChange={e => updateField('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Orçamento</label>
              <div className="flex gap-3">
                <select
                  value={form.budgetType}
                  onChange={e => updateField('budgetType', e.target.value)}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {BUDGET_TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.budget}
                  onChange={e => updateField('budget', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0,00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
              <input
                type="date"
                value={form.startDate}
                onChange={e => updateField('startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data de Fim</label>
              <input
                type="date"
                value={form.endDate}
                onChange={e => updateField('endDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Público-alvo</label>
              <textarea
                value={form.targetAudience}
                onChange={e => updateField('targetAudience', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Descreva o público-alvo desta campanha..."
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
              <textarea
                value={form.notes}
                onChange={e => updateField('notes', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Anotações internas sobre a campanha..."
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors"
            >
              {saving ? 'Salvando...' : 'Salvar Campanha'}
            </button>
          </div>
        </div>
      )}

      {/* Tab: URL & UTMs */}
      {selectedTab === 'url' && (
        <UrlBuilder
          form={form}
          onChange={updateField}
          onSave={isNew ? null : async () => {
            try {
              await saveCampaign({ ...form, id: selectedId })
              setDirty(false)
              toast.success('URL salva.')
            } catch {}
          }}
        />
      )}

      {/* Tab: Materiais */}
      {selectedTab === 'materiais' && (
        <div className="space-y-8">
          {isNew && (
            <p className="text-sm text-orange-600 bg-orange-50 border border-orange-200 rounded-lg p-3">
              Salve a campanha primeiro (aba "Dados Gerais") para poder anexar materiais.
            </p>
          )}
          {!isNew && (
            <>
              <FileUpload
                campaignId={selectedId}
                type="copy"
                label="Arquivos de Copy"
                accept=".doc,.docx,.pdf,.txt,.xlsx"
                files={files.filter(f => f.type === 'copy')}
                onFilesChanged={newFiles => setFiles(prev => [...prev.filter(f => f.type !== 'copy'), ...newFiles])}
              />
              <FileUpload
                campaignId={selectedId}
                type="creative"
                label="Criativos"
                accept="image/*,video/*"
                files={files.filter(f => f.type === 'creative')}
                onFilesChanged={newFiles => setFiles(prev => [...prev.filter(f => f.type !== 'creative'), ...newFiles])}
              />
              <div className="border border-gray-200 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-gray-700">Textos Manuais</h3>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Copy (texto do anúncio)</label>
                  <textarea
                    value={form.copyText}
                    onChange={e => updateField('copyText', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Cole ou digite o texto do anúncio aqui..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Headline</label>
                    <input
                      type="text"
                      value={form.headline}
                      onChange={e => updateField('headline', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Headline principal..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">CTA</label>
                    <input
                      type="text"
                      value={form.cta}
                      onChange={e => updateField('cta', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: Saiba Mais, Comprar Agora..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Descrição</label>
                  <textarea
                    value={form.description}
                    onChange={e => updateField('description', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Descrição do anúncio..."
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={async () => {
                      try {
                        await saveCampaign({ ...form, id: selectedId })
                        setDirty(false)
                        toast.success('Textos salvos.')
                      } catch {}
                    }}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Salvar Textos
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Tab: Checklists */}
      {selectedTab === 'checklists' && (
        <div className="space-y-8">
          <ChecklistPanel
            title="Checklist do Cliente"
            items={form.checklistCliente}
            onChange={items => handleChecklistChange('checklistCliente', items)}
          />
          <ChecklistPanel
            title="Checklist de Pré-Lançamento"
            items={form.checklistPreLancamento}
            onChange={items => handleChecklistChange('checklistPreLancamento', items)}
          />
        </div>
      )}
    </div>
  )
}
