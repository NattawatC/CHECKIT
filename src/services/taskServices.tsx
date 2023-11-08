import axios from 'axios'
import userServices from './userServices'

class taskServices {
  priority = ['High', 'Medium', 'Low']
  category = ['Personal', 'Work', 'Health', 'Others']
  services = new userServices()
  task_info1 = {
    //mockup data
    id: '1',
    title: 'HereGong',
    note: 'Bull shit guy',
    date_start: '16/10/2023',
    date_end: '17/10/2023',
    time_start: '9:00 AM',
    time_end: '9:00 PM',
    priority: 'High',
    role: ['Personal'],
    category: 'Personal',
  }
  task_info2 = {
    //mockup data
    id: '2',
    title: 'HereGong',
    note: 'Bull shit guy',
    date_start: '16/10/2023',
    date_end: '17/10/2023',
    time_start: '9:00 AM',
    time_end: '9:00 PM',
    priority: 'Medium',
    role: ['Personal'],
    category: 'Work',
  }
  task_info3 = {
    //mockup data
    id: '3',
    title: 'HereGong',
    note: 'Bull shit guy',
    date_start: '16/10/2023',
    date_end: '17/10/2023',
    time_start: '9:00 AM',
    time_end: '9:00 PM',
    priority: 'Low',
    role: ['Personal'],
    category: 'Health',
  }
  task_info4 = {
    //mockup data
    id: '4',
    title: 'HereGong',
    note: 'Bull shit guy',
    date_start: '16/10/2023',
    date_end: '17/10/2023',
    time_start: '9:00 AM',
    time_end: '9:00 PM',
    priority: 'High',
    role: ['Personal'],
    category: 'Others',
  }
  task_info5 = {
    //mockup data
    id: '5',
    title: 'HereGong',
    note: 'Bull shit guy',
    date_start: '16/10/2023',
    date_end: '17/10/2023',
    time_start: '9:00 AM',
    time_end: '9:00 PM',
    priority: 'Medium',
    role: ['Personal'],
    category: 'Personal',
  }

  all_task = [
    this.task_info1,
    this.task_info2,
    this.task_info3,
    this.task_info4,
    this.task_info5,
  ]
  //format date and time for DB
  formatDateTimeForDB(date: string, time: string) {
    const [year, month, day] = date.split('-').map(Number)
    const [hours, minutes, seconds] = date.split(':').map(Number)

    const formattedDate = new Date(
      year,
      month - 1,
      day,
      hours,
      minutes,
      seconds
    )
    const formattedDateTime = `${formattedDate.getFullYear()}-${String(
      formattedDate.getMonth() + 1
    ).padStart(2, '0')}-${String(formattedDate.getDate()).padStart(
      2,
      '0'
    )} ${String(formattedDate.getHours()).padStart(2, '0')}:${String(
      formattedDate.getMinutes()
    ).padStart(2, '0')}:${String(formattedDate.getSeconds()).padStart(2, '0')}`

    return formattedDateTime
  }

  //format date for display
  formatDateForDisplay(date: Date) {
    const padTo2Digits = (number: number) => {
      return number.toString().padStart(2, '0')
    }
    //date format
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-')
  }

  //format date from DB
  // formatDateFromDB(d: string) {
  //   const date = new Date(d)
  //   const year = date.getFullYear()
  //   const month = String(date.getMonth() + 1).padStart(2, '0')
  //   const day = String(date.getDate()).padStart(2, '0')
  //   return `${year}-${month}-${day}`
  // }

  //format time from DB
  // formatTimeFromDB(d: string) {
  //   const date = new Date(d)
  //   const hour = String(date.getHours()).padStart(2, '0')
  //   const minute = String(date.getMinutes()).padStart(2, '0')
  //   return `${hour}:${minute}`
  // }

  formatDateTimeFromDB(d: string) {
    const date = new Date(d)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hour = String(date.getHours()).padStart(2, '0')
    const minute = String(date.getMinutes()).padStart(2, '0')
    return {
      time: `${hour}:${minute}`,
      date: `${year}-${month}-${day}`,
    }
  }

  //create task for both personal and team
  async createUserTask(task: {
    title: string
    note: string
    date_start: string
    date_end: string
    time_start: string
    time_end: string
    priority: string
    role: [string]
    category: string
  }) {
    const info = {
      title: task.title,
      description: task.note,
      start: this.formatDateTimeForDB(task.date_start, task.time_start),
      end: this.formatDateTimeForDB(task.date_end, task.time_end),
      priority: task.priority,
      category: task.category,
      status: true,
      task_id: 0,
    }
    try {
      const task_info = await axios.post(
        'http://ict11.ce.kmitl.ac.th:9080/user/task/create',
        info,
        {
          params: { email: this.services.user.email },
        }
      )
      if (task.role[0] !== 'Personal') {
        const team_info = await axios.get(
          'http://ict11.ce.kmitl.ac.th:9080/user/getTeam',
          { params: { email: this.services.user.email } }
        )
        const team_task_info = await axios.post(
          'http://ict11.ce.kmitl.ac.th:9080/user/team/addTask',
          {
            params: {
              team_id: team_info.data.team_id,
              task_id: task_info.data.task_id,
            },
          }
        )
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  //edit task by id
  async editTask(id: number, task: Task) {
    const info = {
      title: task.title,
      description: task.note,
      start: this.formatDateTimeForDB(task.date_start, task.time_start),
      end: this.formatDateTimeForDB(task.date_end, task.time_end),
      priority: task.priority,
      category: task.category,
      status: true,
      task_id: id,
    }
    try {
      const respond = await axios.put(
        'http://ict11.ce.kmitl.ac.th:9080/user/task/edit',
        info,
        { params: { task_id: id } }
      )
      if (respond.status === 200) {
        return true
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  //get task info by id
  async getTaskInfo(id: string) {
    try {
      const all_task = await this.getAllTask()
      if (Array.isArray(all_task)) {
        const task_info = all_task.find((task: any) => task.task_id === id)
        const task = {
          title: task_info.title,
          note: task_info.description,
          date_start: this.formatDateTimeFromDB(task_info.start).date,
          date_end: this.formatDateTimeFromDB(task_info.end).date,
          time_start: this.formatDateTimeFromDB(task_info.start).time,
          time_end: this.formatDateTimeFromDB(task_info.end).time,
          priority: task_info.priority,
          category: task_info.category,
          status: task_info.status,
        }
        return task
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  //get all task of user
  getAllTaskOfUser() {
    try {
      //get user email
      const task_info = axios.get(
        'http://ict11.ce.kmitl.ac.th:9080/user/task/getAllTasksForUser',
        { params: { email: this.services.user.email } }
      )
      return task_info
    } catch (error) {
      console.log(error)
      return false
    }
  }

  //getAllTask by priority
  async getAllTaskByPriority(priority: string) {
    const response = await this.getAllTaskOfUser()
    if (Array.isArray(response)) {
      const filteredTasks = response.filter(
        (task) => task.priority === priority
      )
      return filteredTasks
    } else {
      return []
    }
  }

  //get all task user
  async getAllTask() {
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
  async deleteTask(id: string) {
    try {
      const respond = await axios.delete(
        'http://ict11.ce.kmitl.ac.th:9080/user/task/delete',
        { params: { task_id: id } }
      )
      if (respond.status === 202) {
        return true
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  //filter by date
  async filterByDate() {
    const date = this.formatDateForDisplay(new Date())
    const task_info = await this.getAllTaskOfUser()
    if (Array.isArray(task_info)) {
      const filteredTasks = task_info.filter((task) => {
        const taskDate = this.formatDateTimeFromDB(task.end).date
        //filter from today to future
        return taskDate >= date
      })
      return filteredTasks
    }
  }

  //filter by priority hight-> medium -> low
  async filterByPriority() {
    const task_info = await this.getAllTaskOfUser()
    const result = []
    if (Array.isArray(task_info)) {
      const filteredTasksHigh = task_info.filter((task) => {
        return task.priority === 'high'
      })
      const filteredTasksMedium = task_info.filter((task) => {
        return task.priority === 'medium'
      })
      const filteredTasksLow = task_info.filter((task) => {
        return task.priority === 'low'
      })
      result.push(
        ...filteredTasksHigh,
        ...filteredTasksMedium,
        ...filteredTasksLow
      )
    }
    return result
  }

  //filter by category
  async filterByCategory(category: string) {
    const response = await this.getAllTaskOfUser()
    if (Array.isArray(response)) {
      const filteredTasks = response.filter(
        (task) => task.category === category
      )
      return filteredTasks
    } else {
      return []
    }
  }

  //searchParam task by title
  async searchTask(searchParam: string) {
    const task_info = await this.getAllTaskOfUser()
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
}
export default taskServices
