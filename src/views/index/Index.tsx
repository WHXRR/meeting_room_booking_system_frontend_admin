import { Link, Outlet } from 'react-router-dom'
import { EditOutlined, UserOutlined } from '@ant-design/icons'

export function Index() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-[#f0f0f0]">
        <h1 className="font-bold text-xl">会议室预定系统-管理端</h1>
        <div>
          <Link to="/password_modify" className="mr-4">
            <EditOutlined style={{ fontSize: '20px' }} className="cursor-pointer" />
          </Link>
          <Link to="/info_modify">
            <UserOutlined style={{ fontSize: '20px' }} className="cursor-pointer" />
          </Link>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}
