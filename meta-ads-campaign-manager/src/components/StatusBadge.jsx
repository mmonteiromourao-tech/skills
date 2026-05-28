import { STATUS_OPTIONS, STATUS_COLORS } from '../constants'

export default function StatusBadge({ status }) {
  const label = STATUS_OPTIONS.find(o => o.value === status)?.label ?? status
  const cls = STATUS_COLORS[status] ?? 'bg-gray-100 text-gray-700'
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {label}
    </span>
  )
}
