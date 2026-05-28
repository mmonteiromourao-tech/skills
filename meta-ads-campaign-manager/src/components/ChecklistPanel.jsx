import { useState } from 'react'

export default function ChecklistPanel({ title, items, onChange }) {
  const [newItem, setNewItem] = useState('')

  const checked = items.filter(i => i.checked).length
  const pct = items.length > 0 ? Math.round((checked / items.length) * 100) : 0

  function toggle(id) {
    onChange(items.map(i => i.id === id ? { ...i, checked: !i.checked } : i))
  }

  function removeItem(id) {
    onChange(items.filter(i => i.id !== id))
  }

  function addItem() {
    const label = newItem.trim()
    if (!label) return
    onChange([...items, { id: crypto.randomUUID(), label, checked: false }])
    setNewItem('')
  }

  return (
    <div className="border border-gray-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <span className="text-xs text-gray-500">{checked}/{items.length} ({pct}%)</span>
      </div>
      {/* Progress bar */}
      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
        <div
          className="bg-blue-500 h-1.5 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      {/* Items */}
      <ul className="space-y-2 mb-4">
        {items.map(item => (
          <li key={item.id} className="flex items-start gap-2 group">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggle(item.id)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className={`flex-1 text-sm leading-tight ${item.checked ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
              {item.label}
            </span>
            <button
              onClick={() => removeItem(item.id)}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity text-xs p-0.5"
              title="Remover item"
            >
              ✕
            </button>
          </li>
        ))}
        {items.length === 0 && (
          <li className="text-sm text-gray-400 italic">Nenhum item. Adicione um abaixo.</li>
        )}
      </ul>
      {/* Add item */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addItem()}
          placeholder="Novo item..."
          className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addItem}
          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors"
        >
          + Adicionar
        </button>
      </div>
    </div>
  )
}
