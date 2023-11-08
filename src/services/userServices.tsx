import axios from 'axios'
import dateTimeServices from './dataTimeServices'
import taskServices from './taskServices'
class userServices {
  static getUserInfo() {
    throw new Error('Method not implemented.')
  }
  user = { username: 'Test', email: 'example@gmail.com' }
  data = new taskServices()
  date_time_services = new dateTimeServices()

  //check email format
  checkMailFormat(email: string) {
    //mail format
    var email_format =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    //check email format
    if (email_format.test(email)) {
      return true
    } else {
      return false
    }
  }

  //check user register
  async checkRegister(user: {
    username: string
    email: string
    password: string
  }) {
    try {
      //check email format
      if (this.checkMailFormat(user.email)) {
        console.log('Email format is correct')
        const res = await axios.post(
          'http://ict11.ce.kmitl.ac.th:9080/register',
          user
        )
        if (res.status === 201) {
          this.user = user
          return res.data
        } else if (res.status === 400) {
          console.log('Email is already exist')
          return false
        }
      } else {
        //email format is not correct
        console.log('Email format is not correct')
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  //check user login
  //TODO: connect with database
  checkLogin(user: { email: string; password: string }) {
    //check email format
    if (this.checkMailFormat(user.email)) {
      console.log('Email format is correct')
      this.user.email = user.email
      return true
    } else {
      //email format is not correct
      console.log('Email format is not correct')
      return false
    }
  }

  //get user info
  async getUserInfo() {
    try {
      const current_date = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      })
      const result = {
        username: this.user.username,
        email: this.user.email,
        date: current_date,
        time: 'this.time',
        upcoming_task: await this.getAllTaskByPriority('High'),
        personal_task: await this.filterByCategory('Personal'),
        work_task: await this.filterByCategory('Work'),
        health_task: await this.filterByCategory('Health'),
        others_task: await this.filterByCategory('Others'),
      }
      return result
    } catch (error) {
      const result = {
        username: 'Error',
        email: '',
        date: 'Error',
        time: '',
        upcoming_task: '',
        personal_task: '',
        work_task: '',
        health_task: '',
        others_task: '',
      }
      console.log(error)
      return result
    }
  }
  //create task for both personal and team
  async createUserTask(task: Task) {
    const info = {
      title: task.title,
      description: task.note,
      start: this.date_time_services.formatDateTimeForDB(
        task.date_start,
        task.time_start
      ),
      end: this.date_time_services.formatDateTimeForDB(
        task.date_end,
        task.time_end
      ),
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
          params: { email: this.user.email },
        }
      )
      if (task.role[0] !== 'Personal') {
        const team_info = await axios.get(
          'http://ict11.ce.kmitl.ac.th:9080/user/getTeam',
          { params: { email: this.user.email } }
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
  //get all task of user
  getAllTaskOfUser() {
    try {
      //get user email
      const task_info = axios.get(
        'http://ict11.ce.kmitl.ac.th:9080/user/task/getAllTasksForUser',
        { params: { email: this.user.email } }
      )
      return task_info
    } catch (error) {
      console.log(error)
      return false
    }
  }
  //getAllTask of User by priority
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
  //filter by date
  async filterByDate() {
    const date = this.date_time_services.formatDateForDisplay(new Date())
    const task_info = await this.getAllTaskOfUser()
    if (Array.isArray(task_info)) {
      const filteredTasks = task_info.filter((task) => {
        const taskDate = this.date_time_services.formatDateTimeFromDB(
          task.end
        ).date
        //filter from today to future
        return taskDate >= date
      })
      return filteredTasks
    }
  }
}
export default userServices
