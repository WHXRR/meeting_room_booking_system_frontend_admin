import { Form, Input, Modal, message } from 'antd'
import { useEffect } from 'react'
import { findMeeting, updateMeeting } from '../../api/meeting'

interface UpdateMeetingRoomModalProps {
  open: boolean
  id: number
  handleClose: () => void
  getList: () => void
}

export interface UpdateMeetingRoom {
  id: number
  name: string
  capacity: number
  location: string
  equipment: string
  description: string
}
export function UpdateMeetingRoomModal(props: UpdateMeetingRoomModalProps) {
  const [form] = Form.useForm()

  const getMeeting = async () => {
    if (!props.id)
      return
    const res = await findMeeting(props.id)
    const { data } = res
    if (res.status === 201 || res.status === 200) {
      form.setFieldsValue({
        id: data.data.id,
        name: data.data.name,
        capacity: data.data.capacity,
        location: data.data.location,
        equipment: data.data.equipment,
        description: data.data.description,
      })
    }
    else {
      message.error(res.data.data)
    }
  }
  useEffect(() => {
    getMeeting()
  }, [props.id])

  const handleOk = () => {
    form.validateFields().then(async (values: UpdateMeetingRoom) => {
      const res = await updateMeeting({
        ...values,
        id: props.id,
      })
      if (res.status === 201 || res.status === 200) {
        message.success('更新成功')
        props.handleClose()
        props.getList()
      }
      else {
        message.error(res.data.data)
      }
    })
  }

  return (
    <div>
      <Modal title="编辑会议室" open={props.open} onOk={handleOk} onCancel={props.handleClose}>
        <div className="pt-4">
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            form={form}
          >
            <Form.Item<UpdateMeetingRoom>
              label="会议室名"
              name="name"
              rules={[{
                required: true,
                message: '请输入会议室名',
              }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<UpdateMeetingRoom>
              label="容纳人数"
              name="capacity"
              rules={[{
                required: true,
                message: '请输入容纳人数',
              }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<UpdateMeetingRoom>
              label="位置"
              name="location"
              rules={[{
                required: true,
                message: '请输入位置',
              }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<UpdateMeetingRoom>
              label="设备"
              name="equipment"
              rules={[{
                required: true,
                message: '请输入设备',
              }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<UpdateMeetingRoom>
              label="描述"
              name="description"
              rules={[{
                required: true,
                message: '请输入会议室描述',
              }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  )
}
