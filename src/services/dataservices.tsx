const dataservices = {
  checkMailFormat: (email: string) => {
    //email format
    var emailFormat =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const mailPattern =
      /@(gmail\.com|hotmail\.com|yahoo\.com|kmitl.ac\.th|outlook\.com|icloud.\com)$/i
    if (emailFormat.test(email) && mailPattern.test(email)) {
      return true
    } else {
      return false
    }
  },

  checkLogin: (user: { email: string; password: string }) => {
    //check email format
    if (dataservices.checkMailFormat(user.email)) {
      console.log('Email format is correct')
      console.log(user)
      return true
    } else {
      console.log('Email format is not correct')
      return false
    }
  },
}
export default dataservices
