import api from './config'

export async function getUserList(username: string, nickName: string, email: string, pageNo: number, pageSize: number) {
  return await api.get('/user/list', {
    params: {
      username,
      nickName,
      email,
      pageNo,
      pageSize,
    },
  })
}

export async function freeze(id: number) {
  return await api.get('/user/freeze', {
    params: {
      id,
    },
  })
}
