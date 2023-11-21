interface Task {
  task_id: number
  title: string
  note: string
  date_start: string
  date_end: string
  time_start: string
  time_end: string
  priority: string
  role: string[]
  category: string
  status: boolean
}

interface Team {
  team_id: number
  name: string
  owner: string
  members: []
}
