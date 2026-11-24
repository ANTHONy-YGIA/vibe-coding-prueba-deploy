import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { Check, Pencil, Trash2, X } from 'lucide-react'
import type { Task } from '../types/task'
import { validateTitle } from '../utils/validation'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onUpdate: (id: string, title: string) => void
  onDelete: (id: string) => void
}

const iconButton =
  'inline-flex size-8 items-center justify-center rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'

export function TaskItem({ task, onToggle, onUpdate, onDelete }: TaskItemProps) {
  const [editing, setEditing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [draft, setDraft] = useState(task.title)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const startEdit = () => {
    setDraft(task.title)
    setError(null)
    setConfirmDelete(false)
    setEditing(true)
  }

  const cancelEdit = () => {
    setEditing(false)
    setError(null)
  }

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const message = validateTitle(draft)
    if (message) {
      setError(message)
      return
    }
    onUpdate(task.id, draft)
    setEditing(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') cancelEdit()
  }

  const createdLabel = new Date(task.createdAt).toLocaleDateString('es', {
    day: 'numeric',
    month: 'short',
  })

  if (editing) {
    const errorId = `edit-error-${task.id}`
    return (
      <li className="rounded-lg border border-indigo-200 bg-white p-3 shadow-sm">
        <form onSubmit={handleSave} noValidate className="flex items-center gap-2">
          <label htmlFor={`edit-${task.id}`} className="sr-only">
            Editar título de la tarea
          </label>
          <input
            id={`edit-${task.id}`}
            ref={inputRef}
            type="text"
            value={draft}
            autoComplete="off"
            onChange={(e) => {
              setDraft(e.target.value)
              if (error) setError(null)
            }}
            onKeyDown={handleKeyDown}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={`min-w-0 flex-1 rounded-md border px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 ${
              error
                ? 'border-red-400 focus:ring-red-100'
                : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
            }`}
          />
          <button
            type="submit"
            aria-label="Guardar cambios"
            title="Guardar"
            className={`${iconButton} text-emerald-600 hover:bg-emerald-50`}
          >
            <Check className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={cancelEdit}
            aria-label="Cancelar edición"
            title="Cancelar"
            className={`${iconButton} text-slate-500 hover:bg-slate-100`}
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </form>
        {error && (
          <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-600">
            {error}
          </p>
        )}
      </li>
    )
  }

  return (
    <li className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-colors hover:border-slate-300">
      <button
        type="button"
        role="checkbox"
        aria-checked={task.completed}
        aria-label={`Marcar "${task.title}" como ${task.completed ? 'pendiente' : 'completada'}`}
        onClick={() => onToggle(task.id)}
        className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
          task.completed
            ? 'border-emerald-500 bg-emerald-500 text-white'
            : 'border-slate-300 hover:border-indigo-500'
        }`}
      >
        {task.completed && <Check className="size-3" strokeWidth={3} aria-hidden="true" />}
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={`break-words text-sm ${
            task.completed ? 'text-slate-400 line-through' : 'text-slate-800'
          }`}
        >
          {task.title}
        </p>
        <p className="mt-0.5 text-xs text-slate-400">Creada el {createdLabel}</p>
      </div>

      {confirmDelete ? (
        <div className="flex shrink-0 items-center gap-1">
          <span className="hidden text-xs text-slate-500 sm:inline">¿Eliminar?</span>
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="rounded-md bg-red-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            Eliminar
          </button>
          <button
            type="button"
            onClick={() => setConfirmDelete(false)}
            className="rounded-md px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <div className="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            onClick={startEdit}
            aria-label={`Editar "${task.title}"`}
            title="Editar"
            className={`${iconButton} text-slate-400 hover:bg-slate-100 hover:text-slate-700`}
          >
            <Pencil className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            aria-label={`Eliminar "${task.title}"`}
            title="Eliminar"
            className={`${iconButton} text-slate-400 hover:bg-red-50 hover:text-red-600`}
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </li>
  )
}
