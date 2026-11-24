import { CheckCircle2, ClipboardList, ListTodo, type LucideIcon } from 'lucide-react'
import type { TaskFilter } from '../types/task'

const MESSAGES: Record<TaskFilter, { title: string; text: string; Icon: LucideIcon }> = {
  all: {
    title: 'Aún no tienes tareas',
    text: 'Crea tu primera tarea con el formulario de arriba.',
    Icon: ClipboardList,
  },
  pending: {
    title: 'No hay tareas pendientes',
    text: 'Todo está al día.',
    Icon: CheckCircle2,
  },
  completed: {
    title: 'Sin tareas completadas',
    text: 'Las tareas que marques como hechas aparecerán aquí.',
    Icon: ListTodo,
  },
}

export function EmptyState({ filter }: { filter: TaskFilter }) {
  const { title, text, Icon } = MESSAGES[filter]
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
      <Icon className="mb-3 size-8 text-slate-400" aria-hidden="true" />
      <p className="text-sm font-medium text-slate-700">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{text}</p>
    </div>
  )
}
