import { Outlet, useNavigate } from 'react-router-dom'
import { MailOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useEffect } from 'react'

type MenuItem = Required<MenuProps>['items'][number]
const items: MenuItem[] = [
  {
    key: '/user_manage',
    label: '会议室管理',
    icon: <MailOutlined />,
  },
  {
    key: '/aa',
    label: '预定管理',
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
  useEffect(() => {
    navigate('/user_manage')
  }, [])

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  }
  return (
    <div className="flex h-full">
      <div>
        <Menu
          onClick={onClick}
          style={{ width: 256 }}
          defaultSelectedKeys={['/user_manage']}
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
