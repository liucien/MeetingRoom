import React, {useEffect, useState} from "react";
import {Form, Input, DatePicker, Button} from "antd";
import moment from "moment";
import {listParams} from "type/api";

export interface values {
    date: moment.MomentInput;
}

interface finishProps extends values {
    name: string;
}

interface Props {
    form: any;
    onQuery: (value: listParams) => void;
}

export default function QueryBox({onQuery, form}: Props) {
    const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = (values: finishProps) => {
        const queryVal = {...values, date: moment(values.date).format("YYYY-MM-DD")};

        onQuery(queryVal);
    };

    return (
        <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish} initialValues={{name: "", date: moment()}}>
            <Form.Item name="name">
                <Input placeholder="请输入名称" />
            </Form.Item>
            <Form.Item name="date">
                <DatePicker placeholder="请选择日期" />
            </Form.Item>
            <Form.Item shouldUpdate>
                {() => (
                    <Button type="primary" htmlType="submit">
                        搜索
                    </Button>
                )}
            </Form.Item>
        </Form>
    );
}
