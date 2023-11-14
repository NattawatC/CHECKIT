import axios from 'axios'
import { convertTaskFromDB, convertTaskToDB } from './converter'
import {
  filterUserTaskByCategory,
  filterUserTaskByDate,
  filterUserTaskByPriority,
  getUserTaskByPriority,
  searchUserTask,
} from './taskServices'
import { createUserTeam } from './teamServices'

declare global {
  var user_email: string
  var user_username: string
}
global.user_email = 'example@gmail.com'
global.user_username = 'example'

function getUserEmail() {
  return user_email
}

function getUserName() {
  return user_username
}
//check email format
function checkMailFormat(email: string) {
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
async function checkRegister(user: {
  username: string
  email: string
  password: string
}) {
  try {
    //check email format
    if (checkMailFormat(user.email)) {
      console.log('Email format is correct')
      const res = await axios.post(
        'http://ict11.ce.kmitl.ac.th:9080/register',
        user
      )
      if (res.status === 201) {
        user = user
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
function checkLogin(user: { email: string; password: string }) {
  //check email format
  if (checkMailFormat(user.email)) {
    console.log('Email format is correct')
    user_email = user.email
    return true
  } else {
    //email format is not correct
    console.log('Email format is not correct')
    return false
  }
}

//get user info
async function getUserInfo() {
  try {
    const current_date = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    })
    const result = {
      username: user_username,
      email: user_email,
      date: current_date,
      time: 'this.time',
      upcoming_task: await getAllTaskByPriority('High'),
      personal_task: await filterByCategory('Personal'),
      work_task: await filterByCategory('Work'),
      health_task: await filterByCategory('Health'),
      others_task: await filterByCategory('Others'),
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
async function createUserTask(task: Task) {
  const info = convertTaskToDB(task, 0)
  info.status = false
  try {
    const task_info = await axios.post(
      'http://ict11.ce.kmitl.ac.th:9080/user/task/create',
      info,
      {
        params: { email: user_email },
      }
    )
    if (task.role[0] !== 'Personal') {
      const team_info = await axios.get(
        'http://ict11.ce.kmitl.ac.th:9080/user/getTeam',
        { params: { email: user_email } }
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
async function getAllTaskOfUser() {
  try {
    //get user email
    const task_info = await axios.get(
      'http://ict11.ce.kmitl.ac.th:9080/user/task/getAllTasksForUser',
      { params: { email: user_email } }
    )
    for (let i = 0; i < task_info.data.length; i++) {
      task_info.data[i] = convertTaskFromDB(task_info.data[i])
    }
    return task_info.data
  } catch (error) {
    console.log(error)
    return false
  }
}
//getAllTask of User by priority
async function getAllTaskByPriority(priority: string) {
  const task_info = await getAllTaskOfUser()
  const result = await getUserTaskByPriority(priority, task_info)
  return result
}
//filter by priority hight-> medium -> low
async function filterByPriority() {
  const task_info = await getAllTaskOfUser()
  const result = await filterUserTaskByPriority(task_info)
  return result
}

//filter by category
async function filterByCategory(category: string) {
  const task_info = await getAllTaskOfUser()
  const result = await filterUserTaskByCategory(category, task_info)
  return result
}

//searchParam task by title
async function searchTask(searchParam: string) {
  const task_info = await getAllTaskOfUser()
  const result = await searchUserTask(searchParam, task_info)
  return result
}
//filter by date
async function filterByDate() {
  const task_info = await getAllTaskOfUser()
  const result = await filterUserTaskByDate(task_info)
  return result
}

async function createTeam(team: Team) {
  const user_info = user_email
  const result = await createUserTeam(team, user_info)
  return result
}
export {
  checkRegister,
  checkLogin,
  getUserInfo,
  createUserTask,
  getAllTaskOfUser,
  getAllTaskByPriority,
  filterByPriority,
  filterByCategory,
  searchTask,
  filterByDate,
  createTeam,
  getUserEmail,
  getUserName,
}
