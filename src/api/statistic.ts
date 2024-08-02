import api from './config'

export async function userBookingCount(startTime: string, endTime: string) {
  return api.get('/statistic/userBookingCount', {
    params: {
      startTime,
      endTime,
    },
  })
}

export async function meetingRoomUsedCount(startTime: string, endTime: string) {
  return await api.get('/statistic/meetingRoomUsedCount', {
    params: {
      startTime,
      endTime,
    },
  })
}
