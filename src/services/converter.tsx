import { formatDateTimeForDB, formatDateTimeFromDB } from './dataTimeServices'
function convertTaskFromDB(task: any) {
  const result = {
    title: task.title,
    note: task.description,
    date_start: formatDateTimeFromDB(task.start).date,
    date_end: formatDateTimeFromDB(task.end).date,
    time_start: formatDateTimeFromDB(task.start).time,
    time_end: formatDateTimeFromDB(task.end).time,
    priority: task.priority,
    category: task.category,
    status: task.status,
    task_id: task.task_id,
  }
  return result
}

function convertTaskToDB(task: any, id: number) {
  const result = {
    title: task.title,
    description: task.note,
    start: formatDateTimeForDB(task.date_start, task.time_start),
    end: formatDateTimeForDB(task.date_end, task.time_end),
    priority: task.priority,
    category: task.category,
    status: true,
    task_id: id,
  }
  return result
}
function convertTeamToDB(team: any) {
  const result = {
    team_id: team.team_id,
    name: team.name,
    owner: team.owner,
  }
  return result
}

export { convertTaskFromDB, convertTaskToDB, convertTeamToDB }
