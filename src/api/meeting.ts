import type { CreateMeetingRoom } from '../views/meeting_room_manage/CreateMeetingRoomModal'
import type { UpdateMeetingRoom } from '../views/meeting_room_manage/UpdateMeetingRoom'
import api from './config'

export async function getMeetingList(name: string, capacity: number, location: string, pageNo: number, pageSize: number) {
  return await api.get('/meeting-room/list', {
    params: {
      pageNo,
      pageSize,
      name,
      capacity,
      location,
    },
  })
}

export async function findMeeting(id: number) {
  return await api.get(`/meeting-room/${id}`)
}

export async function deleteMeetingRoom(id: number) {
  return await api.delete(`/meeting-room/${id}`)
}

export async function createMeeting(createMeetingRoom: CreateMeetingRoom) {
  return await api.post('/meeting-room/create', createMeetingRoom)
}

export async function updateMeeting(updateMeetingRoom: UpdateMeetingRoom) {
  return await api.put('/meeting-room/update', updateMeetingRoom)
}
