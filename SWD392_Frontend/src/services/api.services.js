import axios from 'axios'
const API_URL = process.env.SERVICE_API_URL ?? 'https://localhost:7063/api/'

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})

export default instance
