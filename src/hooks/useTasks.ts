import { useEffect, useMemo, useState } from 'react'
import type { Task, TaskFilter, TaskStats } from '../types/task'
import { loadTasks, saveTasks } from '../utils/storage'
import { createId } from '../utils/id'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)
  const [filter, setFilter] = useState<TaskFilter>('all')

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const addTask = (title: string) => {
    const now = Date.now()
    const task: Task = { id: createId(), title: title.trim(), completed: false, createdAt: now, updatedAt: now }
    setTasks((prev) => [task, ...prev])
  }

  const updateTask = (id: string, title: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: title.trim(), updatedAt: Date.now() } : t)),
    )
  }

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed, updatedAt: Date.now() } : t)),
    )
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const stats = useMemo<TaskStats>(() => {
    const total = tasks.length
    const completed = tasks.filter((t) => t.completed).length
    return {
      total,
      completed,
      pending: total - completed,
      percent: total === 0 ? 0 : Math.round((completed / total) * 100),
    }
  }, [tasks])

  const visibleTasks = useMemo(() => {
    if (filter === 'pending') return tasks.filter((t) => !t.completed)
    if (filter === 'completed') return tasks.filter((t) => t.completed)
    return tasks
  }, [tasks, filter])

  return { tasks, visibleTasks, filter, setFilter, stats, addTask, updateTask, toggleTask, deleteTask }
}
