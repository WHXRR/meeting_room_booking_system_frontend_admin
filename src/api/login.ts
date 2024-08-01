import api from './config'

export async function login(username: string, password: string) {
  return await api.post('/user/admin/login', {
    username,
    password,
  })
}
