import React, {useState} from "react";
import {Modal, Form} from "antd";
import {listItem} from "../type";
import EditForm from "./EditForm";
import {actions} from "module/roomDetail";
import {connect, DispatchProp} from "react-redux";
import moment from "moment";

interface Props extends DispatchProp {
    item: listItem;
    title?: string;
    userName?: string;
}

function EditModal({item, dispatch, title = "编辑", userName}: Props) {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const onOk = async () => {
        await form.validateFields();
        const initParams = form.getFieldsValue();
        const [date, time] = moment(initParams.time).format("YYYY-MM-DD HH").split(" ");
        const params = {...initParams, time: [date, `${Number(time)}:00 ~ ${Number(time) + 1}:00`]};
        dispatch(actions.editItem(params));

        handleOk();
    };

    return (
        <React.Fragment>
            <a onClick={showModal}>{title}</a>
            <Modal title={item.time} visible={isModalVisible} onCancel={handleOk} onOk={onOk} okText="保存" cancelText="取消">
                <EditForm initialValues={{...item, user: userName ? userName : item.user}} form={form} />
            </Modal>
        </React.Fragment>
    );
}

export default connect()(EditModal);
