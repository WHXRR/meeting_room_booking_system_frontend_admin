import { Form, Input, Modal, message } from 'antd'
import { createMeeting } from '../../api/meeting'

interface CreateMeetingRoomModalProps {
  open: boolean
  handleClose: () => void
  getList: () => void
}

export interface CreateMeetingRoom {
  name: string
  capacity: number
  location: string
  equipment: string
  description: string
}
export function CreateMeetingRoomModal(props: CreateMeetingRoomModalProps) {
  const [form] = Form.useForm()
  const handleOk = () => {
    form.validateFields().then(async (values: CreateMeetingRoom) => {
      const res = await createMeeting(values)
      if (res.status === 201 || res.status === 200) {
        message.success('创建成功')
        form.resetFields()
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
      <Modal title="新增会议室" open={props.open} onOk={handleOk} onCancel={props.handleClose}>
        <div className="pt-4">
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            form={form}
          >
            <Form.Item<CreateMeetingRoom>
              label="会议室名"
              name="name"
              rules={[{
                required: true,
                message: '请输入会议室名',
              }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<CreateMeetingRoom>
              label="容纳人数"
              name="capacity"
              rules={[{
                required: true,
                message: '请输入容纳人数',
              }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<CreateMeetingRoom>
              label="位置"
              name="location"
              rules={[{
                required: true,
                message: '请输入位置',
              }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<CreateMeetingRoom>
              label="设备"
              name="equipment"
              rules={[{
                required: true,
                message: '请输入设备',
              }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<CreateMeetingRoom>
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
