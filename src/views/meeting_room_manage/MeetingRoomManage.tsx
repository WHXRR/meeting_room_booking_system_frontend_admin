import { Button, Form, Input, Popconfirm, Table, message } from 'antd'
import type { TableProps } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { deleteMeetingRoom, getMeetingList } from '../../api/meeting'
import { CreateMeetingRoomModal } from './CreateMeetingRoomModal'
import { UpdateMeetingRoomModal } from './UpdateMeetingRoom'

interface SearchMeeting {
  name: string
  capacity: number
  location: string
}
export interface MeetingRoomTableType {
  id: number
  name: string
  capacity: number
  location: string
  equipment: string
  description: string
}
export function MeetingRoomManage() {
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [data, setData] = useState([])
  const [form] = Form.useForm()
  const [number, setNumber] = useState(0)

  const onFinish = async (values: SearchMeeting) => {
    const res = await getMeetingList(values.name, values.capacity, values.location, pageNo, pageSize)
    const { data } = res.data
    if (res.status === 200 || res.status === 201) {
      setData(data.meetingRooms.map((item: MeetingRoomTableType) => ({
        key: item.name,
        ...item,
      })))
    }
    else {
      message.error(data.message)
    }
  }

  useEffect(() => {
    onFinish({
      name: form.getFieldValue('name'),
      capacity: form.getFieldValue('capacity'),
      location: form.getFieldValue('location'),
    })
  }, [pageNo, pageSize, number])

  const reset = () => {
    form.resetFields()
    setNumber(Math.random())
  }

  const deleteMeeting = async (id: number) => {
    const res = await deleteMeetingRoom(id)
    if (res.status === 200 || res.status === 201) {
      message.success('删除成功')
      setNumber(Math.random())
    }
    else {
      message.error(res.data.data)
    }
  }

  const changePage = (pageNo: number, pageSize: number) => {
    setPageNo(pageNo)
    setPageSize(pageSize)
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [updateId, setUpdateId] = useState(0)

  const columns: TableProps<MeetingRoomTableType>['columns'] = useMemo(() => [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '容量',
      dataIndex: 'capacity',
    },
    {
      title: '位置',
      dataIndex: 'location',
    },
    {
      title: '设备',
      dataIndex: 'equipment',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (_, record) => (
        <div>
          <Popconfirm
            title="会议室删除"
            description="确认删除吗？"
            onConfirm={() => deleteMeeting(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <a className="text-blue-500" href="#">删除</a>
          </Popconfirm>
          <a
            className="text-blue-500 pl-4"
            href="#"
            onClick={() => {
              setIsUpdateModalOpen(true)
              setUpdateId(record.id)
            }}
          >
            编辑
          </a>
        </div>
      ),
    },
  ], [])

  return (
    <div>
      <Form
        name="search"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 17 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="inline"
        form={form}
      >
        <Form.Item<SearchMeeting>
          label="会议室名"
          name="name"
        >
          <Input />
        </Form.Item>
        <Form.Item<SearchMeeting>
          label="容纳人数"
          name="capacity"
        >
          <Input />
        </Form.Item>
        <Form.Item<SearchMeeting>
          label="位置"
          name="location"
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">搜索</Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={reset}>重置</Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={() => { setIsModalOpen(true) }}>新建</Button>
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
      <CreateMeetingRoomModal
        open={isModalOpen}
        handleClose={() => { setIsModalOpen(false) }}
        getList={() => { setNumber(Math.random()) }}
      />
      <UpdateMeetingRoomModal
        open={isUpdateModalOpen}
        id={updateId}
        handleClose={() => { setIsUpdateModalOpen(false) }}
        getList={() => { setNumber(Math.random()) }}
      />
    </div>
  )
}
