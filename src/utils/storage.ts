import type { Task } from '../types/task'

export const STORAGE_KEY = 'taskflow.tasks.v1'

function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) return false
  const t = value as Record<string, unknown>
  return (
    typeof t.id === 'string' &&
    typeof t.title === 'string' &&
    typeof t.completed === 'boolean' &&
    typeof t.createdAt === 'number' &&
    typeof t.updatedAt === 'number'
  )
}

/** Lee las tareas guardadas. Ignora datos corruptos o con formato inválido. */
export function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(isTask) : []
  } catch {
    return []
  }
}

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    // Almacenamiento lleno o bloqueado (p. ej. modo privado): la app sigue funcionando en memoria.
  }
}
