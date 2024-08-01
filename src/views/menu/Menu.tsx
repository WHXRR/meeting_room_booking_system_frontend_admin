import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { MailOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useEffect } from 'react'

type MenuItem = Required<MenuProps>['items'][number]
const items: MenuItem[] = [
  {
    key: '/meeting_room_manage',
    label: '会议室管理',
    icon: <MailOutlined />,
  },
  {
    key: '/user_manage',
    label: '用户管理',
    icon: <MailOutlined />,
  },
  {
    key: '/bb',
    label: '用户管理',
    icon: <MailOutlined />,
  },
  {
    key: '/cc',
    label: '统计',
    icon: <MailOutlined />,
  },
]

export function MeetingMenu() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/meeting_room_manage')
    }
  }, [])

  function getSelectedKeys() {
    if (location.pathname === '/') {
      return ['/meeting_room_manage']
    }
    else {
      return [location.pathname]
    }
  }
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  }
  return (
    <div className="flex h-full">
      <div>
        <Menu
          onClick={onClick}
          style={{ width: 256 }}
          defaultSelectedKeys={getSelectedKeys()}
          items={items}
          className="h-full"
        />
      </div>
      <div className="p-4 flex-1 overflow-hidden overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}
