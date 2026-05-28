import { useRef, useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import toast from 'react-hot-toast'
import { saveFile, deleteFile } from '../db'
import { MAX_FILE_SIZE_BYTES } from '../constants'

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

async function generateImageThumbnail(file) {
  return new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 160
      canvas.height = 120
      const ctx = canvas.getContext('2d')
      const ratio = Math.min(160 / img.width, 120 / img.height)
      const w = img.width * ratio
      const h = img.height * ratio
      ctx.drawImage(img, (160 - w) / 2, (120 - h) / 2, w, h)
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL('image/jpeg', 0.7))
    }
    img.onerror = () => { URL.revokeObjectURL(url); resolve(null) }
    img.src = url
  })
}

function downloadFile(record) {
  const url = URL.createObjectURL(record.blob)
  const a = document.createElement('a')
  a.href = url
  a.download = record.name
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 100)
}

function FileIcon({ mimeType }) {
  if (mimeType?.startsWith('image/')) return <span className="text-2xl">🖼️</span>
  if (mimeType?.startsWith('video/')) return <span className="text-2xl">🎬</span>
  if (mimeType?.includes('pdf')) return <span className="text-2xl">📄</span>
  if (mimeType?.includes('word') || mimeType?.includes('document')) return <span className="text-2xl">📝</span>
  if (mimeType?.includes('sheet') || mimeType?.includes('excel')) return <span className="text-2xl">📊</span>
  return <span className="text-2xl">📎</span>
}

function PreviewModal({ file, open, onClose }) {
  const [objUrl, setObjUrl] = useState(null)

  useEffect(() => {
    if (open && file) {
      const url = URL.createObjectURL(file.blob)
      setObjUrl(url)
      return () => {
        URL.revokeObjectURL(url)
        setObjUrl(null)
      }
    }
  }, [open, file])

  if (!file) return null

  return (
    <Dialog.Root open={open} onOpenChange={isOpen => { if (!isOpen) onClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-40" />
        <Dialog.Content
          className="fixed inset-4 z-50 bg-white rounded-xl flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <Dialog.Title className="text-sm font-medium text-gray-800">{file.name}</Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-700 text-xl leading-none">✕</Dialog.Close>
          </div>
          <div className="flex-1 overflow-auto flex items-center justify-center p-4 bg-gray-50">
            {objUrl && file.mimeType?.startsWith('image/') && (
              <img src={objUrl} alt={file.name} className="max-w-full max-h-full object-contain" />
            )}
            {objUrl && file.mimeType?.startsWith('video/') && (
              <video src={objUrl} controls className="max-w-full max-h-full" />
            )}
            {!file.mimeType?.startsWith('image/') && !file.mimeType?.startsWith('video/') && (
              <p className="text-gray-500 text-sm">Pré-visualização não disponível. Clique em "Baixar" para abrir o arquivo.</p>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default function FileUpload({ campaignId, type, label, accept, files, onFilesChanged }) {
  const inputRef = useRef()
  const [uploading, setUploading] = useState(false)
  const [previewFile, setPreviewFile] = useState(null)

  async function handleUpload(e) {
    const selected = Array.from(e.target.files || [])
    e.target.value = ''
    if (!selected.length) return

    const oversized = selected.filter(f => f.size > MAX_FILE_SIZE_BYTES)
    if (oversized.length > 0) {
      toast.error(`Arquivo(s) muito grande(s): máximo 50 MB por arquivo. (${oversized.map(f => f.name).join(', ')})`)
      return
    }

    setUploading(true)
    const saved = []
    for (const file of selected) {
      try {
        let thumbnailDataUrl = null
        if (file.type.startsWith('image/')) {
          thumbnailDataUrl = await generateImageThumbnail(file)
        }
        const record = await saveFile({
          id: crypto.randomUUID(),
          campaignId,
          type,
          name: file.name,
          mimeType: file.type,
          size: file.size,
          blob: file,
          thumbnailDataUrl,
        })
        saved.push(record)
      } catch (err) {
        if (err.name === 'QuotaExceededError' || (err.message && err.message.toLowerCase().includes('quota'))) {
          toast.error(`Armazenamento insuficiente para "${file.name}". Libere espaço no navegador.`)
        } else {
          toast.error(`Erro ao salvar "${file.name}".`)
        }
      }
    }
    setUploading(false)
    if (saved.length > 0) onFilesChanged([...files, ...saved])
  }

  async function handleDelete(id, name) {
    if (!window.confirm(`Remover "${name}"?`)) return
    try {
      await deleteFile(id)
      onFilesChanged(files.filter(f => f.id !== id))
      toast.success('Arquivo removido.')
    } catch {
      toast.error('Erro ao remover arquivo.')
    }
  }

  const isCreative = type === 'creative'

  return (
    <div className="border border-gray-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">{label}</h3>
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors disabled:opacity-60"
        >
          {uploading ? 'Enviando...' : '+ Adicionar arquivo'}
        </button>
        <input ref={inputRef} type="file" accept={accept} multiple className="hidden" onChange={handleUpload} />
      </div>

      {files.length === 0 ? (
        <p className="text-sm text-gray-400 italic">Nenhum arquivo anexado.</p>
      ) : isCreative ? (
        /* Creative gallery */
        <div className="grid grid-cols-3 gap-3">
          {files.map(f => (
            <div key={f.id} className="relative group rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
              <button
                onClick={() => setPreviewFile(f)}
                className="w-full aspect-video flex items-center justify-center overflow-hidden"
              >
                {f.thumbnailDataUrl ? (
                  <img src={f.thumbnailDataUrl} alt={f.name} className="w-full h-full object-cover" />
                ) : (
                  <FileIcon mimeType={f.mimeType} />
                )}
              </button>
              <div className="p-2">
                <p className="text-xs text-gray-600 truncate">{f.name}</p>
                <p className="text-xs text-gray-400">{formatSize(f.size)}</p>
              </div>
              <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => downloadFile(f)}
                  className="bg-white rounded p-1 shadow text-xs hover:bg-gray-50"
                  title="Baixar"
                >⬇</button>
                <button
                  onClick={() => handleDelete(f.id, f.name)}
                  className="bg-white rounded p-1 shadow text-xs hover:bg-red-50 text-red-500"
                  title="Remover"
                >✕</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Copy files list */
        <ul className="space-y-2">
          {files.map(f => (
            <li key={f.id} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg">
              <FileIcon mimeType={f.mimeType} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">{f.name}</p>
                <p className="text-xs text-gray-400">{formatSize(f.size)}</p>
              </div>
              <button
                onClick={() => downloadFile(f)}
                className="text-xs text-blue-600 hover:underline shrink-0"
              >Baixar</button>
              <button
                onClick={() => handleDelete(f.id, f.name)}
                className="text-xs text-red-500 hover:underline shrink-0"
              >Remover</button>
            </li>
          ))}
        </ul>
      )}

      <PreviewModal
        file={previewFile}
        open={!!previewFile}
        onClose={() => setPreviewFile(null)}
      />
    </div>
  )
}
