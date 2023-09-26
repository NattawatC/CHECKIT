interface User {
  email: string
  password: string
}
const dataservices = {
  checkLogin: (user: User) => {
    let list = [{ email: 'admin@gmail.com', password: 'admin1234' }]
    if (
      list.find(
        (item) => item.email === user.email && item.password === user.password
      )
    ) {
      console.log('login success')
      console.log(user.email, user.password)
      return true
    }
  },
}

export default dataservices
