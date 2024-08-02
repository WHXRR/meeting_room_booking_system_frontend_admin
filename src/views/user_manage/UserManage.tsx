import { Button, Form, Image, Input, Table, message } from 'antd'
import type { TableProps } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { freeze, getUserList } from '../../api/userManage'

interface SearchUser {
  username: string
  nickName: string
  email: string
}

export interface UserTableType {
  id: number
  username: string
  email: string
  nickName: string
  createTime: Date
  headPic: string
  isFrozen: boolean
}
export function UserManage() {
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [data, setData] = useState([])

  const searchUser = async (values: SearchUser) => {
    const res = await getUserList(values.username, values.nickName, values.email, pageNo, pageSize)
    const { data } = res.data
    if (res.status === 200 || res.status === 201) {
      setData(data.users.map((user: UserTableType) => ({
        key: user.username,
        ...user,
      })))
    }
    else {
      message.error(data.message)
    }
  }

  const [number, setNumber] = useState(0)
  const freezeUser = async (id: number) => {
    const res = await freeze(id)
    if (res.status === 200 || res.status === 201) {
      message.success('冻结成功')
      const num = Math.random()
      setNumber(num)
    }
    else {
      message.error(res.data.data)
    }
  }

  const [form] = Form.useForm()
  useEffect(() => {
    searchUser({
      username: form.getFieldValue('username'),
      nickName: form.getFieldValue('nickName'),
      email: form.getFieldValue('email'),
    })
  }, [pageNo, pageSize, number])

  const columns: TableProps<UserTableType>['columns'] = useMemo(() => [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '头像',
      dataIndex: 'headPic',
      render: (value) => {
        return value ? <Image width={50} src={value} /> : ''
      },
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
    },
    {
      title: '是否冻结',
      dataIndex: 'isFrozen',
      render: (value) => {
        return value ? '是' : '否'
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (_, record) => (
        <a className="text-blue-500" onClick={() => freezeUser(record.id)}>冻结</a>
      ),
    },
  ], [])

  const changePage = (pageNo: number, pageSize: number) => {
    setPageNo(pageNo)
    setPageSize(pageSize)
  }
  const reset = () => {
    form.resetFields()
    const num = Math.random()
    setNumber(num)
  }

  return (
    <div>
      <Form
        name="search"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ remember: true }}
        onFinish={searchUser}
        layout="inline"
        form={form}
      >
        <Form.Item<SearchUser>
          label="用户名"
          name="username"
        >
          <Input />
        </Form.Item>
        <Form.Item<SearchUser>
          label="昵称"
          name="nickName"
        >
          <Input />
        </Form.Item>
        <Form.Item<SearchUser>
          label="邮箱"
          name="email"
          rules={[
            { type: 'email', message: '请输入正确的邮箱地址' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">搜索</Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={reset}>重置</Button>
        </Form.Item>
      </Form>
      <div className="pt-4">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            current: pageNo,
            pageSize,
            onChange: changePage,
          }}
        />
      </div>
    </div>
  )
}
