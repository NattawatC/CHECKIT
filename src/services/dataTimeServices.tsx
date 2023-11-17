//format date and time for DB
function formatDateTimeForDB(date: string, time: string) {
  const [year, month, day] = date.split('-').map(Number)
  const [hours, minutes] = date.split(':').map(Number)
  const seconds = 0

  const formattedDate = new Date(year, month - 1, day, hours, minutes, seconds)
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
function formatDateForDisplay(date: Date) {
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

function formatDateTimeFromDB(d: string) {
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
export { formatDateForDisplay, formatDateTimeForDB, formatDateTimeFromDB }
