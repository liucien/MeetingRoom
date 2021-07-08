import React from "react";
import {Popconfirm} from "antd";
import {listItem} from "../type";

interface Props {
    item: listItem;
    onConfirm: (item: listItem) => void;
}

export default function DeleteBtn({item, onConfirm}: Props) {
    return (
        <Popconfirm title={`是否删除当前时段(${item.time})预约`} onConfirm={() => onConfirm(item)} okText="确定" cancelText="取消">
            <a>删除</a>
        </Popconfirm>
    );
}
