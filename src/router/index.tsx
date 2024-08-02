import { createBrowserRouter } from 'react-router-dom'
import { Login } from '../views/login/Login'
import { ErrorPage } from '../views/error_page/ErrorPage'
import { Index } from '../views/index/Index'
import { MeetingMenu } from '../views/menu/Menu'
import { UserManage } from '../views/user_manage/UserManage'
import { InfoModify } from '../views/info_modify/InfoModify'
import { PasswordModify } from '../views/password_modify/PasswordModify'
import { MeetingRoomManage } from '../views/meeting_room_manage/MeetingRoomManage'
import { BookingManage } from '../views/booking_manage/BookingManage'
import { Statistics } from '../views/statistics/Statistics'

const routes = [
  {
    path: '/',
    element: <Index />,
    children: [
      {
        path: '/',
        element: <MeetingMenu />,
        children: [
          {
            path: 'info_modify',
            element: <InfoModify />,
          },
          {
            path: 'password_modify',
            element: <PasswordModify />,
          },
          {
            path: 'user_manage',
            element: <UserManage />,
          },
          {
            path: 'meeting_room_manage',
            element: <MeetingRoomManage />,
          },
          {
            path: 'booking_manage',
            element: <BookingManage />,
          },
          {
            path: 'statistics',
            element: <Statistics />,
          },
        ],
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]

export const router = createBrowserRouter(routes)
