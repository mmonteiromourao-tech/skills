import { openDB } from 'idb'

const DB_NAME = 'MetaAdsDB'
const DB_VERSION = 1

let dbPromise = null

function getDb() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const clientsStore = db.createObjectStore('clients', { keyPath: 'id' })
        clientsStore.createIndex('name', 'name')

        const campaignsStore = db.createObjectStore('campaigns', { keyPath: 'id' })
        campaignsStore.createIndex('clientId', 'clientId')
        campaignsStore.createIndex('status', 'status')

        const filesStore = db.createObjectStore('files', { keyPath: 'id' })
        filesStore.createIndex('campaignId', 'campaignId')
      },
    })
  }
  return dbPromise
}

// --- Clients ---
export async function getAllClients() {
  const db = await getDb()
  return db.getAll('clients')
}

export async function saveClient(client) {
  const db = await getDb()
  const now = new Date().toISOString()
  const record = { ...client, updatedAt: now }
  if (!record.createdAt) record.createdAt = now
  await db.put('clients', record)
  return record
}

export async function deleteClient(id) {
  const db = await getDb()
  await db.delete('clients', id)
}

// --- Campaigns ---
export async function getAllCampaigns() {
  const db = await getDb()
  return db.getAll('campaigns')
}

export async function getCampaign(id) {
  const db = await getDb()
  return db.get('campaigns', id)
}

export async function saveCampaign(campaign) {
  const db = await getDb()
  const now = new Date().toISOString()
  const record = { ...campaign, updatedAt: now }
  if (!record.createdAt) record.createdAt = now
  await db.put('campaigns', record)
  return record
}

export async function deleteCampaign(id) {
  const db = await getDb()
  const tx = db.transaction(['campaigns', 'files'], 'readwrite')
  const filesStore = tx.objectStore('files')
  const campaignsStore = tx.objectStore('campaigns')
  // Queue all requests before any await to prevent transaction auto-commit
  const files = await filesStore.index('campaignId').getAll(id)
  const reqs = [campaignsStore.delete(id), ...files.map(f => filesStore.delete(f.id))]
  await Promise.all(reqs)
  await tx.done
}

export async function getCampaignsByClientId(clientId) {
  const db = await getDb()
  return db.getAllFromIndex('campaigns', 'clientId', clientId)
}

// --- Files ---
export async function getFilesForCampaign(campaignId) {
  const db = await getDb()
  return db.getAllFromIndex('files', 'campaignId', campaignId)
}

export async function saveFile(file) {
  const db = await getDb()
  const now = new Date().toISOString()
  const record = { ...file, createdAt: now }
  await db.put('files', record)
  return record
}

export async function deleteFile(id) {
  const db = await getDb()
  await db.delete('files', id)
}
