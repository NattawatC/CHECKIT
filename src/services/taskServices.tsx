import axios from 'axios'
import { convertTaskFromDB, convertTaskToDB } from './converter'
import { formatDateForDisplay, formatDateTimeFromDB } from './dataTimeServices'
//edit task by id
async function editTask(id: number, task: Task) {
  const info = convertTaskToDB(task, id)
  try {
    const respond = await axios.put(
      'http://ict11.ce.kmitl.ac.th:9080/user/task/edit',
      info,
      { params: { task_id: id } }
    )
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

//get task info by id
async function getTaskInfo(id: number) {
  try {
    const all_task = await getAllTask()
    if (Array.isArray(all_task)) {
      const task_info = all_task.find((task: any) => task.task_id === id)
      const task = convertTaskFromDB(task_info)
      return task
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

//get all task user
async function getAllTask() {
  try {
    const respond = await axios.get(
      'http://ict11.ce.kmitl.ac.th:9080/user/task/getAllTasks'
    )
    if (Array.isArray(respond.data)) {
      return respond.data
    }
  } catch (error) {
    console.log(error)
    return []
  }
}

//delete task by id
async function deleteTask(id: number) {
  try {
    const respond = await axios.delete(
      'http://ict11.ce.kmitl.ac.th:9080/user/task/delete',
      { params: { task_id: id } }
    )
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
//getAllTask of User by priority
async function getUserTaskByPriority(priority: string, task: any) {
  const response = task
  if (Array.isArray(response)) {
    const filteredTasks = response.filter((task) => task.priority === priority)
    for (let i = 0; i < filteredTasks.length; i++) {
      filteredTasks[i] = convertTaskFromDB(filteredTasks[i])
    }
    return filteredTasks
  } else {
    return []
  }
}
//filter by priority hight-> medium -> low
async function filterUserTaskByPriority(task: any) {
  const task_info = task
  const result = []
  if (Array.isArray(task_info)) {
    const filteredTasksHigh = task_info.filter((task) => {
      return task.priority === 'high'
    })
    convertTaskFromDB(filteredTasksHigh)
    const filteredTasksMedium = task_info.filter((task) => {
      return task.priority === 'medium'
    })
    convertTaskFromDB(filteredTasksMedium)
    const filteredTasksLow = task_info.filter((task) => {
      return task.priority === 'low'
    })
    convertTaskFromDB(filteredTasksLow)
    result.push(
      ...filteredTasksHigh,
      ...filteredTasksMedium,
      ...filteredTasksLow
    )
  }
  return result
}

//filter by category
async function filterUserTaskByCategory(category: string, task: any) {
  const response = task
  if (Array.isArray(response)) {
    const filteredTasks = response.filter((task) => task.category === category)
    return filteredTasks
  } else {
    return []
  }
}

//searchParam task by title
async function searchUserTask(searchParam: string, task: any) {
  const task_info = task
  if (Array.isArray(task_info)) {
    const filteredTasks = task_info.filter((task) => {
      const taskTitle = task.title
      return taskTitle.toLowerCase().startsWith(searchParam.toLowerCase())
    })
    return filteredTasks
  } else {
    return []
  }
}
//filter by date
async function filterUserTaskByDate(task: any) {
  const date = formatDateForDisplay(new Date())
  const task_info = task
  if (Array.isArray(task_info)) {
    const filteredTasks = task_info.filter((task) => {
      const taskDate = formatDateTimeFromDB(task.end).date
      //filter from today to future
      return taskDate >= date
    })
    return filteredTasks
  }
}
export {
  editTask,
  getTaskInfo,
  getAllTask,
  deleteTask,
  getUserTaskByPriority,
  filterUserTaskByPriority,
  filterUserTaskByCategory,
  searchUserTask,
  filterUserTaskByDate,
}
