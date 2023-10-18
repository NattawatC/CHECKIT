import axios from 'axios'
class dataservices {
  static getUserInfo() {
    throw new Error('Method not implemented.')
  }
  user = { email: 'example@gmail.com', password: '' }
  priority = ['High', 'Medium', 'Low']
  category = ['Personal', 'Work', 'Health', 'Others']
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

  //mock member data
  team_member_1 = {
    name: 'Non',
    status: 'Pending',
  }
  team_member_2 = {
    name: 'Vega',
    status: 'Member',
  }
  team_member_3 = {
    name: 'Jimmy',
    status: 'Pending',
  }
  //mock team data
  team_info1 = {
    id: '1',
    name: 'Team 1',
    owner: 'Test1',
    members: [this.team_member_1, this.team_member_2, this.team_member_3],
  }
  team_info2 = {
    id: '2',
    name: 'Team 2',
    owner: 'Test1',
    members: [this.team_member_1, this.team_member_2, this.team_member_3],
  }

  //mock team data
  all_team = [this.team_info1, this.team_info2]

  //get current date & time
  date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })
  time = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })
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

  //pading number
  padTo2Digits(number: number) {
    return number.toString().padStart(2, '0')
  }
  //date format
  formatDate(date: Date) {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/')
  }

  //check user register
  async checkRegister(user: {
    username: string
    email: string
    password: string
  }) {
    //check email format
    if (this.checkMailFormat(user.email)) {
      console.log('Email format is correct')
      const res = await axios.post(
        '/register',
        apiService.bodyToQueryFormat(user)
      )
      if (res.status === 201) {
        return true
      } else if (res.status === 400) {
        return false
      }
    } else {
      //email format is not correct
      console.log('Email format is not correct')
      return false
    }
  }

  //check user login
  //TODO: connect with database
  checkLogin(user: { email: string; password: string }) {
    //check email format
    if (this.checkMailFormat(user.email)) {
      console.log('Email format is correct')
      this.user = user
      return true
    } else {
      //email format is not correct
      console.log('Email format is not correct')
      return false
    }
  }

  //get user info
  //convert user email to query format
  // const user_email = apiService.bodyToQueryFormat(this.user.email)

  // //get user info
  // const user_info = axios('/user/profile?' + user_email).then((res) => {
  //   return res.data
  // })
  // const upcoming_task = this.getAllTaskByValue('High')
  // const personal_task = this.getAllTaskByValue('Personal')
  // const work_task = this.getAllTaskByValue('Work')
  // const health_task = this.getAllTaskByValue('Health')
  // const others_task = this.getAllTaskByValue('Others')
  // Promise.all([user_info])
  //   .then(([user_info]) => {
  //     const result = {
  //       username: user_info.name,
  //       email: user_info.email,
  //       date: this.date,
  //       time: this.time,
  //       upcoming_task: upcoming_task,
  //       personal_task: personal_task,
  //       work_task: work_task,
  //       health_task: health_task,
  //       others_task: others_task,
  //     }
  //   })
  //   .then((result) => {
  //     return result
  //   })
  async getUserInfo() {
    const user_email = apiService.bodyToQueryFormat(this.user.email)
    // Fetch user information from an API or database
    const user_info = await axios.get('/user/profile?' + user_email)
    const user_task = await axios.get(
      'http://ict11.ce.kmitl.ac.th:9080/user/task/getAllTasksForUser?' +
        user_email
    )

    const result = {
      username: user_info.data.name,
      email: user_info.data.email,
      date: this.date,
      time: this.time,
      upcoming_task: this.getAllTaskByPriority('High'),
      personal_task: this.filterByCategory('Personal'),
      work_task: this.filterByCategory('Work'),
      health_task: this.filterByCategory('Health'),
      others_task: this.filterByCategory('Others'),
    }
    return result
  }

  //create task
  createUserTask(task: {
    title: string
    note: string
    date_start: Date
    date_end: Date
    time_start: string
    time_end: string
    priority: string
    role: [string]
    category: string
  }) {
    const user_email = apiService.bodyToQueryFormat(this.user.email)
    const task_info = axios.post(
      '/user/task/createTaskForUser' + user_email,
      apiService.bodyToQueryFormat(task)
    )
    return true
  }

  //edit task by id
  //TODO: post data to database
  editTask(task: {
    id: string
    title: string
    note: string
    date_start: Date
    date_end: Date
    time_start: string
    time_end: string
    priority: string
    role: [string]
    category: string
  }) {
    return true
  }

  //get task info by id
  //TODO: get data from database
  getTaskInfo(id: string) {
    const result = this.all_task.find((task_data) => task_data.id === id)
    return [result]
  }

  //get all task of user
  getAllTaskOfUser() {
    //get user email
    const user_email = apiService.bodyToQueryFormat(this.user.email)
    const task_info = axios.get('/user/task/getAllTasksForUser' + user_email)
    return task_info
  }

  //getAllTask by priority
  getAllTaskByPriority(priority: string) {
    const user_email = apiService.bodyToQueryFormat(this.user.email)
    const task_info = axios.get('/user/task/getAllTasksForUser' + user_email)
    if (Array.isArray(task_info)) {
      return task_info.filter((task) => task.priority === priority)
    } else {
      return []
    }
  }

  //get all task of user
  //TODO: get all task data from database
  getAllTask() {
    const task = this.all_task
    return task
  }

  //delete task by id
  //TODO: delete task request to database
  deleteTask(id: string) {
    const result = this.all_task.find((task_data) => task_data.id === id)
    return true
  }

  //filter by date
  //TODO: get data from database
  filterByDate() {
    const date = this.formatDate(new Date())
    const task_info = this.all_task
    const filteredTasks = task_info.filter((task) => {
      const taskDateStart = task.date_start
      const taskDateEnd = task.date_end
      return date >= taskDateStart && date <= taskDateEnd
    })
    return filteredTasks
  }

  //filter by priority hight-> medium -> low
  filterByPriority() {
    const task_info = this.getAllTaskOfUser()
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
  filterByCategory(category: string) {
    const task_info = this.getAllTaskOfUser()
    if (Array.isArray(task_info)) {
      return task_info.filter((task) => task.category === category)
    } else {
      return []
    }
  }

  //searchParam task by title
  //TODO: get data from database
  searchTask(searchParam: string) {
    const task_info = this.all_task
    const filteredTasks = task_info.filter((task) => {
      const taskTitle = task.title
      return taskTitle.includes(searchParam)
    })
    return filteredTasks
  }

  //create team
  //TODO: post data to database
  createTeam(team: { name: string; member: [string] }) {}

  //get team info by id
  //TODO: get data from database
  getTeamInfo(id: string) {
    const team_info = this.all_team
    const result = team_info.find((team_data) => team_data.id === id)
    return result
  }

  //get all team of user
  //TODO: get data from database
  getAllTeamOfUser() {
    const team_info = this.all_team
    return team_info
  }

  //get all team
  //TODO: get data from database
  getAllTeam() {
    const team_info = this.all_team
    return team_info
  }

  //get team member by id
  //TODO: get data from database
  getTeamMember(id: string) {
    const team_info = this.all_team
    const result = team_info.find((team_data) => team_data.id === id)
    return result?.members
  }

  //add member to team
  //TODO: post data to database
  addMemberToTeam(id: string, member: { name: string; status: string }) {
    const team_info = this.all_team
    const result = team_info.find((team_data) => team_data.id === id)
    result?.members.push(member)
    return true
  }

  //edit team  info by id
  //TODO: post data to database
  editTeamInfo(
    id: string,
    team: { name: string; member: [{ name: string; status: string }] }
  ) {
    return true
  }

  //delete team by id
  //TODO: delete team request to database
  deleteTeam(id: string) {
    return true
  }
}
export default dataservices
