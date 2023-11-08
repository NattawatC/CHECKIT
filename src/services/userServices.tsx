import axios from 'axios'
import taskservices from './taskServices'
class dataServices {
  static getUserInfo() {
    throw new Error('Method not implemented.')
  }
  user = { username: 'Test', email: 'example@gmail.com' }
  data = new taskservices()
  //mock member data

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
        upcoming_task: await this.data.getAllTaskByPriority('High'),
        personal_task: await this.data.filterByCategory('Personal'),
        work_task: await this.data.filterByCategory('Work'),
        health_task: await this.data.filterByCategory('Health'),
        others_task: await this.data.filterByCategory('Others'),
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
}
export default dataServices
