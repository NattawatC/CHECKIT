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
}
export default dataservices
