import { useEffect } from 'react'
import Layout from './components/Layout'
import CampaignList from './pages/CampaignList'
import CampaignDetail from './pages/CampaignDetail'
import ClientList from './pages/ClientList'
import useAppStore from './store/useAppStore'

function parseHash() {
  const hash = window.location.hash.replace('#/', '')
  if (hash === 'clientes') return { section: 'clientes', campaignId: null }
  if (hash.startsWith('campanhas/')) {
    const id = hash.replace('campanhas/', '')
    if (id === 'new' || id === '') return { section: 'campanhas', campaignId: null }
    return { section: 'campanhas', campaignId: id }
  }
  return { section: 'campanhas', campaignId: null }
}

export default function App() {
  const bootstrap = useAppStore(s => s.bootstrap)
  const loaded = useAppStore(s => s.loaded)
  const activeSection = useAppStore(s => s.activeSection)
  const selectedCampaignId = useAppStore(s => s.selectedCampaignId)
  const setActiveSection = useAppStore(s => s.setActiveSection)
  const setSelectedCampaign = useAppStore(s => s.setSelectedCampaign)

  useEffect(() => {
    bootstrap()
  }, [])

  useEffect(() => {
    function onHashChange() {
      const { section, campaignId } = parseHash()
      // Update store without triggering another hash write
      useAppStore.setState({ activeSection: section, selectedCampaignId: campaignId })
    }
    window.addEventListener('hashchange', onHashChange)
    onHashChange() // sync on mount
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-500">Carregando...</p>
      </div>
    )
  }

  return (
    <Layout>
      {activeSection === 'clientes' && <ClientList />}
      {activeSection === 'campanhas' && selectedCampaignId === null && <CampaignList />}
      {activeSection === 'campanhas' && selectedCampaignId !== null && <CampaignDetail />}
    </Layout>
  )
}
