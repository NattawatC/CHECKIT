import { object } from 'zod'

const dataservices = {
  //check email format
  checkMailFormat: (email: string) => {
    //mail format
    var email_format =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //mail pattern
    const mail_pattern =
      /@(gmail\.com|hotmail\.com|yahoo\.com|kmitl.ac\.th|outlook\.com|icloud.\com)$/i
    //check email format
    if (email_format.test(email) && mail_pattern.test(email)) {
      return true
    } else {
      return false
    }
  },

  //pading number
  padTo2Digits: (number: number) => {
    return number.toString().padStart(2, '0')
  },
  //date format
  formatDate: (date: Date) => {
    return [
      dataservices.padTo2Digits(date.getDate()),
      dataservices.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/')
  },

  //check user register
  //TODO: connect with database
  checkRegister: (user: {
    username: string
    email: string
    password: string
  }) => {
    //check email format
    if (dataservices.checkMailFormat(user.email)) {
      console.log('Email format is correct')
      return true
    } else {
      //email format is not correct
      console.log('Email format is not correct')
      return false
    }
  },

  //check user login
  //TODO: connect with database
  checkLogin: (user: { email: string; password: string }) => {
    //check email format
    if (dataservices.checkMailFormat(user.email)) {
      console.log('Email format is correct')
      console.log(user)
      return true
    } else {
      //email format is not correct
      console.log('Email format is not correct')
      return false
    }
  },

  //get user info
  getUserInfo: () => {
    //get current date & time
    let date = dataservices.formatDate(new Date())
    let time = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
    //get user info from database
    //TODO: fetch data from database
    //query user info
    const user_info = {
      //mockup data
      username: 'Test',
      date: date,
      time: time,
      upcoming_task: [{ task: object }].length,
      personal_task: [{ task: object }].length,
      worker_task: [{ task: object }].length,
      health_task: [{ task: object }].length,
      others_task: [{ task: object }].length,
    }
    console.log(user_info)
    return user_info
  },
}
export default dataservices
