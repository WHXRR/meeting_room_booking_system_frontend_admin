import type { UpdateUserInfo } from '../views/info_modify/InfoModify'
import type { UpdatePassword } from '../views/password_modify/PasswordModify'
import api from './config'

export async function getUserInfo() {
  return await api.get('/user/info')
}

export async function updateUserInfo(userInfo: UpdateUserInfo) {
  return await api.post('/user/admin/update', userInfo)
}

export async function updateUserInfoCaptcha() {
  return await api.get('/user/update/captcha')
}

export async function updatePasswordCaptcha(address: string) {
  return await api.get('/user/update_password/captcha', {
    params: { address },
  })
}
export async function updatePassword(updatePassword: UpdatePassword) {
  return await api.post('/user/admin/update_password', updatePassword)
}
