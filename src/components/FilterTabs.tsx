import type { TaskFilter, TaskStats } from '../types/task'

interface FilterTabsProps {
  value: TaskFilter
  onChange: (filter: TaskFilter) => void
  stats: TaskStats
}

export function FilterTabs({ value, onChange, stats }: FilterTabsProps) {
  const options: { id: TaskFilter; label: string; count: number }[] = [
    { id: 'all', label: 'Todas', count: stats.total },
    { id: 'pending', label: 'Pendientes', count: stats.pending },
    { id: 'completed', label: 'Completadas', count: stats.completed },
  ]

  return (
    <div
      role="group"
      aria-label="Filtrar tareas"
      className="inline-flex w-full rounded-lg bg-slate-100 p-1 sm:w-auto"
    >
      {options.map((option) => {
        const active = option.id === value
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.id)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:flex-none ${
              active ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {option.label}
            <span
              className={`rounded-full px-1.5 text-xs tabular-nums ${
                active ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-200 text-slate-500'
              }`}
            >
              {option.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
