import dateTimeServices from './dataTimeServices'
class converter {
  date_time_services = new dateTimeServices()
  convertTaskFromDB(task: any) {
    const result = {
      title: task.title,
      note: task.description,
      date_start: this.date_time_services.formatDateTimeFromDB(task.start).date,
      date_end: this.date_time_services.formatDateTimeFromDB(task.end).date,
      time_start: this.date_time_services.formatDateTimeFromDB(task.start).time,
      time_end: this.date_time_services.formatDateTimeFromDB(task.end).time,
      priority: task.priority,
      category: task.category,
      status: task.status,
    }
    return result
  }

  convertTaskToDB(task: any, id: number) {
    const result = {
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
    return result
  }
}
export default converter
