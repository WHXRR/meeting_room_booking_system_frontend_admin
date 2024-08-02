import { Button, DatePicker, Form, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import { meetingRoomUsedCount, userBookingCount } from '../../api/statistic'

interface UserBookingData {
  userId: string
  username: string
  bookingCount: string
}
interface MeetingRoomUsedData {
  meetingRoomName: string
  meetingRoomId: number
  usedCount: string
}
export function Statistics() {
  const [form] = Form.useForm()

  const [userBookingData, setUserBookingData] = useState<Array<UserBookingData>>()
  const [meetingRoomUsedData, setMeetingRoomUsedData] = useState<Array<MeetingRoomUsedData>>()
  async function getStatisticData(values: { startTime: string, endTime: string }) {
    const startTime = dayjs(values.startTime).format('YYYY-MM-DD')
    const endTime = dayjs(values.endTime).format('YYYY-MM-DD')

    const res = await userBookingCount(startTime, endTime)
    const { data } = res.data
    if (res.status === 201 || res.status === 200) {
      setUserBookingData(data)
    }
    else {
      message.error(data || '系统繁忙，请稍后再试')
    }

    const res2 = await meetingRoomUsedCount(startTime, endTime)
    const { data: data2 } = res2.data
    if (res2.status === 201 || res2.status === 200) {
      setMeetingRoomUsedData(data2)
    }
    else {
      message.error(data2 || '系统繁忙，请稍后再试')
    }
  }

  const echartsRef = useRef(null)
  const echartsRef2 = useRef(null)
  useEffect(() => {
    const myChart = echarts.init(echartsRef.current)
    if (!userBookingData) {
      return
    }
    myChart.setOption({
      title: {
        text: '用户预定情况',
      },
      tooltip: {},
      xAxis: {
        data: userBookingData?.map(item => item.username),
      },
      yAxis: {},
      series: [
        {
          name: '预定次数',
          type: 'bar',
          data: userBookingData?.map((item) => {
            return {
              name: item.username,
              value: item.bookingCount,
            }
          }),
        },
      ],
    })
  }, [userBookingData])

  useEffect(() => {
    const myChart = echarts.init(echartsRef2.current)

    if (!meetingRoomUsedData) {
      return
    }

    myChart.setOption({
      title: {
        text: '会议室使用情况',
      },
      tooltip: {},
      xAxis: {
        data: meetingRoomUsedData?.map(item => item.meetingRoomName),
      },
      yAxis: {},
      series: [
        {
          name: '使用次数',
          type: 'bar',
          data: meetingRoomUsedData?.map((item) => {
            return {
              name: item.meetingRoomName,
              value: item.usedCount,
            }
          }),
        },
      ],
    })
  }, [meetingRoomUsedData])

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="inline"
        onFinish={getStatisticData}
        form={form}
      >
        <Form.Item label="开始日期" name="startTime">
          <DatePicker />
        </Form.Item>
        <Form.Item label="结束日期" name="endTime">
          <DatePicker />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">搜索</Button>
        </Form.Item>
      </Form>
      <div className="pt-4">
        <div className="statistics-echarts w-full h-[500px]" ref={echartsRef}></div>
      </div>
      <div className="pt-4">
        <div className="statistics-echarts w-full h-[500px]" ref={echartsRef2}></div>
      </div>
    </div>
  )
}
