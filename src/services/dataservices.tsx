interface UserLogin {
  email: string
  password: string
}
const dataservices = {
  checkLogin: (user: UserLogin) => {
    //email format
    var emailFormat =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const mailPattern =
      /@(gmail\.com|hotmail\.com|yahoo\.com|kmitl.ac\.th|outlook\.com|icloud.\com)$/i
    if (emailFormat.test(user.email)) {
      //check mail format & pattern
      if (mailPattern.test(user.email)) {
        //check mail pattern
        console.log('email format correct')
        return true
      } else {
        //mail pattern incorrect
        console.log('mail invalid incorrect')
        return false
      }
    } else {
      //email format incorrect
      console.log('email format incorrect')
      return false
    }
  },
}
export default dataservices
