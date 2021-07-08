import React from "react";
import {Form, Input, DatePicker, Select, Button} from "antd";
import {listItem} from "../type";
import moment from "moment";

const {TextArea} = Input;
const {Option} = Select;

interface Props {
    initialValues: listItem;
    form: any;
}

const disabled0to59 = () => new Array(60).fill(0).map((_, idx) => idx);
const disabledHours = () => {
    return new Array(12).fill(0).map((_, idx) => (idx > 9 ? idx + 12 : idx - 1));
};

export default function EditForm({initialValues, form}: Props) {
    const {time} = initialValues;
    const [date, timeFrame] = time;
    const newInitValue = {...initialValues, time: moment(`${date} ${timeFrame.split("~")[0]}`)};

    return (
        <Form form={form} name="basic" labelCol={{span: 4}} initialValues={newInitValue}>
            <Form.Item name="time" label="时间段">
                <DatePicker showTime placeholder="请选择日期" disabledHours={disabledHours} disabledMinutes={disabled0to59} disabledSeconds={disabled0to59} />
            </Form.Item>
            <Form.Item label="使用者" name="user" rules={[{required: true}]}>
                <Input disabled />
            </Form.Item>

            <Form.Item
                label="使用用途"
                name="use"
                rules={[
                    {
                        required: true,
                        message: "请输入使用用途!",
                    },
                ]}
            >
                <TextArea />
            </Form.Item>

            <Form.Item label="用途描述" name="useDescription">
                <TextArea />
            </Form.Item>
            <Form.Item label="参会人" name="participant">
                <Select mode="multiple" placeholder="请选择">
                    <Option value="red">aaa</Option>
                    <Option value="green">bbb</Option>
                    <Option value="blue">ccc</Option>
                </Select>
            </Form.Item>
        </Form>
    );
}
