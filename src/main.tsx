import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Login } from './views/login/Login'
import { ErrorPage } from './views/error_page/ErrorPage'
import { Index } from './views/index/Index'
import './index.css'
import { MeetingMenu } from './views/menu/Menu'
import { UserManage } from './views/user_manage/UserManage'
import { InfoModify } from './views/info_modify/InfoModify'
import { PasswordModify } from './views/password_modify/PasswordModify'
import { MeetingRoomManage } from './views/meeting_room_manage/MeetingRoomManage'

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
            path: 'user_manage',
            element: <UserManage />,
          },
          {
            path: 'meeting_room_manage',
            element: <MeetingRoomManage />,
          },
          {
            path: 'info_modify',
            element: <InfoModify />,
          },
          {
            path: 'password_modify',
            element: <PasswordModify />,
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
const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
