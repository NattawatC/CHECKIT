import axios from 'axios'
import converter from './converter'
import dateTimeServices from './dataTimeServices'
import taskServices from './taskServices'
import teamServices from './teamServices'
class userServices {
  static getUserInfo() {
    throw new Error('Method not implemented.')
  }
  user = { username: 'Test', email: 'example@gmail.com' }
  data = new taskServices()
  date_time_services = new dateTimeServices()
  team_data = new teamServices()
  converter = new converter()

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
    const info = this.converter.convertTaskToDB(task, 0)
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
        // loop task.role array
        for (let i = 0; i < task.role.length; i++) {
          const team_task_info = await axios.post(
            'http://ict11.ce.kmitl.ac.th:9080/user/team/addTask',
            {
              params: {
                team_id: task.role[i],
                task_id: task_info.data.task_id,
              },
            }
          )
        }
      }
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
  //get all task of user
  async getAllTaskOfUser() {
    try {
      //get user email
      const task_info = await axios.get(
        'http://ict11.ce.kmitl.ac.th:9080/user/task/getAllTasksForUser',
        { params: { email: this.user.email } }
      )
      for (let i = 0; i < task_info.data.length; i++) {
        task_info.data[i] = this.converter.convertTaskFromDB(task_info.data[i])
      }
      return task_info.data
    } catch (error) {
      console.log(error)
      return false
    }
  }
  //getAllTask of User by priority
  async getAllTaskByPriority(priority: string) {
    const task_info = await this.getAllTaskOfUser()
    const result = await this.data.getAllTaskByPriority(priority, task_info)
    return result
  }
  //filter by priority hight-> medium -> low
  async filterByPriority() {
    const task_info = await this.getAllTaskOfUser()
    const result = await this.data.filterByPriority(task_info)
    return result
  }

  //filter by category
  async filterByCategory(category: string) {
    const task_info = await this.getAllTaskOfUser()
    const result = await this.data.filterByCategory(category, task_info)
    return result
  }

  //searchParam task by title
  async searchTask(searchParam: string) {
    const task_info = await this.getAllTaskOfUser()
    const result = await this.data.searchTask(searchParam, task_info)
    return result
  }
  //filter by date
  async filterByDate() {
    const task_info = await this.getAllTaskOfUser()
    const result = await this.data.filterByDate(task_info)
    return result
  }

  async createTeam(team: { name: string; member: [string] }) {
    const user_info = this.user.email
    const result = await this.team_data.createTeam(team, user_info)
    return result
  }
}
export default userServices
