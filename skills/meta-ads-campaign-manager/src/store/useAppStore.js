import { create } from 'zustand'
import toast from 'react-hot-toast'
import {
  getAllClients, saveClient as dbSaveClient, deleteClient as dbDeleteClient,
  getAllCampaigns, saveCampaign as dbSaveCampaign, deleteCampaign as dbDeleteCampaign,
  getCampaignsByClientId,
} from '../db'

let loadClientsSeq = 0
let loadCampaignsSeq = 0

const useAppStore = create((set, get) => ({
  // Data
  clients: [],
  campaigns: [],
  loaded: false,

  // Navigation (hash-based routing handled in App.jsx)
  activeSection: 'campanhas', // 'campanhas' | 'clientes'
  selectedCampaignId: null,
  selectedTab: 'dados',

  // Filters
  searchText: '',
  filterStatus: '',
  filterObjective: '',
  filterClientId: '',

  // --- Bootstrap ---
  async bootstrap() {
    const seq1 = ++loadClientsSeq
    const seq2 = ++loadCampaignsSeq
    try {
      const [clients, campaigns] = await Promise.all([getAllClients(), getAllCampaigns()])
      if (seq1 === loadClientsSeq && seq2 === loadCampaignsSeq) {
        set({ clients, campaigns, loaded: true })
      }
    } catch (e) {
      toast.error('Erro ao carregar dados do banco local.')
    }
  },

  // --- Clients ---
  async saveClient(data) {
    try {
      const record = await dbSaveClient(data)
      set(state => {
        const idx = state.clients.findIndex(c => c.id === record.id)
        if (idx >= 0) {
          const clients = [...state.clients]
          clients[idx] = record
          return { clients }
        }
        return { clients: [...state.clients, record] }
      })
      return record
    } catch (e) {
      toast.error('Erro ao salvar cliente.')
      throw e
    }
  },

  async deleteClient(id) {
    // Query DB directly for linked campaigns (not just in-memory state)
    try {
      const linked = await getCampaignsByClientId(id)
      if (linked.length > 0) {
        return { blocked: true, count: linked.length }
      }
      await dbDeleteClient(id)
      set(state => ({ clients: state.clients.filter(c => c.id !== id) }))
      return { blocked: false }
    } catch (e) {
      toast.error('Erro ao excluir cliente.')
      throw e
    }
  },

  // --- Campaigns ---
  async saveCampaign(data) {
    try {
      const record = await dbSaveCampaign(data)
      set(state => {
        const idx = state.campaigns.findIndex(c => c.id === record.id)
        if (idx >= 0) {
          const campaigns = [...state.campaigns]
          campaigns[idx] = record
          return { campaigns }
        }
        return { campaigns: [...state.campaigns, record] }
      })
      return record
    } catch (e) {
      toast.error('Erro ao salvar campanha.')
      throw e
    }
  },

  async deleteCampaign(id) {
    try {
      await dbDeleteCampaign(id)
      set(state => ({
        campaigns: state.campaigns.filter(c => c.id !== id),
        selectedCampaignId: state.selectedCampaignId === id ? null : state.selectedCampaignId,
      }))
    } catch (e) {
      toast.error('Erro ao excluir campanha.')
      throw e
    }
  },

  async duplicateCampaign(id) {
    try {
      const campaigns = get().campaigns
      const original = campaigns.find(c => c.id === id)
      if (!original) return
      const now = new Date().toISOString()
      const { createDefaultChecklistCliente, createDefaultChecklistPreLancamento } = await import('../constants')
      const copy = {
        ...original,
        id: crypto.randomUUID(),
        name: original.name + ' (Cópia)',
        status: 'rascunho',
        checklistCliente: original.checklistCliente.map(item => ({ ...item, id: crypto.randomUUID() })),
        checklistPreLancamento: original.checklistPreLancamento.map(item => ({ ...item, id: crypto.randomUUID() })),
        createdAt: now,
        updatedAt: now,
      }
      const record = await dbSaveCampaign(copy)
      set(state => ({ campaigns: [...state.campaigns, record] }))
      return record
    } catch (e) {
      toast.error('Erro ao duplicar campanha.')
      throw e
    }
  },

  // --- Navigation ---
  setActiveSection(section) {
    set({ activeSection: section, selectedCampaignId: null, selectedTab: 'dados' })
    window.location.hash = section === 'clientes' ? '#/clientes' : '#/'
  },

  setSelectedCampaign(id) {
    set({ selectedCampaignId: id, selectedTab: 'dados' })
    if (id) window.location.hash = `#/campanhas/${id}`
    else window.location.hash = '#/'
  },

  setSelectedTab(tab) {
    set({ selectedTab: tab })
  },

  // --- Filters ---
  setFilter(key, value) {
    set({ [key]: value })
  },
}))

export default useAppStore
