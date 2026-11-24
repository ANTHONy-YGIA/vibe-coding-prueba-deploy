import type { TaskStats } from '../types/task'

interface StatsPanelProps {
  stats: TaskStats
}

export function StatsPanel({ stats }: StatsPanelProps) {
  const items = [
    { label: 'Total', value: stats.total, color: 'text-slate-900' },
    { label: 'Pendientes', value: stats.pending, color: 'text-amber-600' },
    { label: 'Hechas', value: stats.completed, color: 'text-emerald-600' },
  ]

  return (
    <section
      aria-labelledby="stats-title"
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="mb-3 flex items-baseline justify-between">
        <h2 id="stats-title" className="text-sm font-semibold text-slate-700">
          Progreso
        </h2>
        <span className="text-sm font-semibold tabular-nums text-indigo-600">{stats.percent}%</span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={stats.percent}
        aria-label="Porcentaje de tareas completadas"
      >
        <div
          className="h-full rounded-full bg-indigo-600 transition-[width] duration-300"
          style={{ width: `${stats.percent}%` }}
        />
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-2">
        {items.map((item) => (
          <div key={item.label} className="rounded-lg bg-slate-50 px-2 py-2">
            <dt className="truncate text-xs text-slate-500">{item.label}</dt>
            <dd className={`text-lg font-semibold tabular-nums ${item.color}`}>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
