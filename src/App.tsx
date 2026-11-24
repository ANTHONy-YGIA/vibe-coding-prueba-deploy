import { CheckSquare } from 'lucide-react'
import { useTasks } from './hooks/useTasks'
import { TaskForm } from './components/TaskForm'
import { StatsPanel } from './components/StatsPanel'
import { FilterTabs } from './components/FilterTabs'
import { TaskItem } from './components/TaskItem'
import { EmptyState } from './components/EmptyState'

export default function App() {
  const { visibleTasks, filter, setFilter, stats, addTask, updateTask, toggleTask, deleteTask } =
    useTasks()

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center gap-2.5 px-4 py-4 sm:px-6">
          <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <CheckSquare className="size-4" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight text-slate-900">TaskFlow</h1>
            <p className="text-xs text-slate-500">Organiza tu día, tarea por tarea</p>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-4xl gap-4 px-4 py-6 sm:px-6 md:grid-cols-[minmax(0,1fr)_19rem] md:items-start">
        <aside className="md:sticky md:top-6 md:order-2">
          <StatsPanel stats={stats} />
        </aside>

        <div className="space-y-4 md:order-1">
          <TaskForm onAdd={addTask} />

          <section aria-labelledby="list-title" className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 id="list-title" className="text-sm font-semibold text-slate-700">
                Mis tareas
              </h2>
              <FilterTabs value={filter} onChange={setFilter} stats={stats} />
            </div>

            {visibleTasks.length === 0 ? (
              <EmptyState filter={filter} />
            ) : (
              <ul className="space-y-2">
                {visibleTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onUpdate={updateTask}
                    onDelete={deleteTask}
                  />
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
