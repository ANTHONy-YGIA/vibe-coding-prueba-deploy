export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: number
  updatedAt: number
}

export type TaskFilter = 'all' | 'pending' | 'completed'

export interface TaskStats {
  total: number
  pending: number
  completed: number
  percent: number
}
