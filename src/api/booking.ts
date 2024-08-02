import dayjs from 'dayjs'
import type { UpdateBooking } from '../views/booking_manage/BookingManage'
import api from './config'

export function getBookingList(searchBooking: UpdateBooking, pageNo: number, pageSize: number) {
  let bookingTimeRangeStart
  let bookingTimeRangeEnd

  if (searchBooking.rangeStartDate && searchBooking.rangeStartTime) {
    const rangeStartDateStr = dayjs(searchBooking.rangeStartDate).format('YYYY-MM-DD')
    const rangeStartTimeStr = dayjs(searchBooking.rangeStartTime).format('HH:mm')
    bookingTimeRangeStart = dayjs(`${rangeStartDateStr} ${rangeStartTimeStr}`).valueOf()
  }

  if (searchBooking.rangeEndDate && searchBooking.rangeEndTime) {
    const rangeEndDateStr = dayjs(searchBooking.rangeEndDate).format('YYYY-MM-DD')
    const rangeEndTimeStr = dayjs(searchBooking.rangeEndTime).format('HH:mm')
    bookingTimeRangeEnd = dayjs(`${rangeEndDateStr} ${rangeEndTimeStr}`).valueOf()
  }

  return api.get('/booking/list', {
    params: {
      username: searchBooking.username,
      meetingRoomName: searchBooking.meetingRoomName,
      meetingRoomPosition: searchBooking.meetingRoomPosition,
      bookingTimeRangeStart,
      bookingTimeRangeEnd,
      pageNo,
      pageSize,
    },
  })
}

export async function apply(id: number) {
  return await api.get(`/booking/apply/${id}`)
}

export async function reject(id: number) {
  return await api.get(`/booking/reject/${id}`)
}

export async function unbind(id: number) {
  return await api.get(`/booking/unbind/${id}`)
}
