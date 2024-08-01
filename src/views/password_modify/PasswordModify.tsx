import { Button, Form, Input, message } from 'antd'
import { useCallback, useEffect } from 'react'
import { getUserInfo, updatePassword, updatePasswordCaptcha } from '../../api/userInfo'

export interface UpdatePassword {
  email: string
  username: string
  password: string
  confirmPassword: string
  captcha: string
}

export function PasswordModify() {
  const [form] = Form.useForm()

  useEffect(() => {
    async function query() {
      const res = await getUserInfo()
      const { data } = res.data
      if (res.status === 200 || res.status === 201) {
        form.setFieldValue('username', data.username)
        form.setFieldValue('email', data.email)
      }
    }
    query()
  }, [])

  const getCaptcha = useCallback(async () => {
    const address = form.getFieldValue('email')
    if (!address) {
      return message.error('请输入邮箱')
    }
    const res = await updatePasswordCaptcha(address)
    if ([200, 201].includes(res.status)) {
      message.success(res.data.data)
    }
    else {
      message.error(res.data.data)
    }
  }, [])

  const onFinish = useCallback(async (values: UpdatePassword) => {
    if (values.password !== values.confirmPassword) {
      return message.error('两次密码不一致')
    }
    const res = await updatePassword({
      ...values,
      username: form.getFieldValue('username'),
      email: form.getFieldValue('email'),
    })
    const { data } = res.data
    if ([200, 201].includes(res.status)) {
      message.success('密码修改成功')
    }
    else {
      message.error(data || '系统繁忙，请稍后再试')
    }
  }, [])
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="mt-6 w-full max-w-[400px]">
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
          autoComplete="off"
        >
          <Form.Item<UpdatePassword >
            label="新密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<UpdatePassword >
            label="确认密码"
            name="confirmPassword"
            rules={[{ required: true, message: '请输入确认密码!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<UpdatePassword > label="验证码">
            <div className="flex justify-between">
              <Form.Item<UpdatePassword >
                name="captcha"
                noStyle
                rules={[{ required: true, message: '请输入验证码!' }]}
              >
                <Input />
              </Form.Item>
              <Button className="ml-2" type="primary" onClick={getCaptcha}>获取验证码</Button>
            </div>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Button type="primary" htmlType="submit" className="w-full">
              修改
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
