import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://ict11.ce.kmitl.ac.th:9080/',
})

export default axiosInstance
