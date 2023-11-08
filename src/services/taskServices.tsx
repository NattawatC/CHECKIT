import axios from 'axios'
import dateTimeServices from './dataTimeServices'
class taskServices {
  priority = ['High', 'Medium', 'Low']
  category = ['Personal', 'Work', 'Health', 'Others']
  date_time_services = new dateTimeServices()
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

  //edit task by id
  async editTask(id: number, task: Task) {
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
          date_start: this.date_time_services.formatDateTimeFromDB(
            task_info.start
          ).date,
          date_end: this.date_time_services.formatDateTimeFromDB(task_info.end)
            .date,
          time_start: this.date_time_services.formatDateTimeFromDB(
            task_info.start
          ).time,
          time_end: this.date_time_services.formatDateTimeFromDB(task_info.end)
            .time,
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
}
export default taskServices
