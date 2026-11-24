import { useState, type FormEvent } from 'react'
import { Plus } from 'lucide-react'
import { TITLE_MAX_LENGTH, validateTitle } from '../utils/validation'

interface TaskFormProps {
  onAdd: (title: string) => void
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  const length = title.trim().length

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const message = validateTitle(title)
    if (message) {
      setError(message)
      return
    }
    onAdd(title)
    setTitle('')
    setError(null)
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <label htmlFor="new-task" className="mb-2 block text-sm font-medium text-slate-700">
        Nueva tarea
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="new-task"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            if (error) setError(null)
          }}
          placeholder="¿Qué necesitas hacer?"
          autoComplete="off"
          aria-invalid={error ? true : undefined}
          aria-describedby="new-task-hint"
          className={`min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
              : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
          }`}
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          <Plus className="size-4" aria-hidden="true" />
          Agregar
        </button>
      </div>
      <div id="new-task-hint" className="mt-1.5 flex min-h-4 items-start justify-between gap-3 text-xs">
        <p role="alert" className="text-red-600">
          {error}
        </p>
        <span
          className={`shrink-0 tabular-nums ${length > TITLE_MAX_LENGTH ? 'text-red-600' : 'text-slate-400'}`}
        >
          {length}/{TITLE_MAX_LENGTH}
        </span>
      </div>
    </form>
  )
}
