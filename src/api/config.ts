import axios from 'axios'
import { message } from 'antd'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000,
})

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token')

  if (accessToken) {
    config.headers.authorization = `Bearer ${accessToken}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const { data, config } = error.response

    if (data.code === 401 && !config.url.includes('/user/admin/refresh')) {
      const res = await refreshToken()

      if (res.status === 200 || res.status === 201) {
        return axiosInstance(config)
      }
      else {
        message.error(res.data)

        setTimeout(() => {
          window.location.href = '/login'
        }, 1500)
      }
    }
    else {
      return error.response
    }
  },
)

async function refreshToken() {
  const res = await axiosInstance.get('/user/admin/refresh', {
    params: {
      refresh_token: localStorage.getItem('refresh_token'),
    },
  })
  localStorage.setItem('access_token', res.data.accessToken)
  localStorage.setItem('refresh_token', res.data.refreshToken)
  return res
}

export default axiosInstance
