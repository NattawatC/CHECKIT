import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://ict11.ce.kmitl.ac.th:9080/',
  timeout: 1000,
})
