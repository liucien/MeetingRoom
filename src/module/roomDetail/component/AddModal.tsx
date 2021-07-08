import React, {useState, useMemo} from "react";
import {Modal, Form, Button} from "antd";
import {listItem} from "../type";
import EditForm from "./EditForm";
import {connect, DispatchProp} from "react-redux";
import moment from "moment";
import {actions} from "module/roomDetail";

interface Props extends DispatchProp {
    timeList: Array<listItem>;
    userName: string;
}
function AddModal({timeList, userName, dispatch}: Props) {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const initValue = useMemo(() => {
        const [item] = timeList.filter(term => !term.status);
        return {...item, user: userName};
    }, [timeList, userName]);

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
            <Button onClick={showModal}>新增</Button>
            <Modal title="新增" visible={isModalVisible} onCancel={handleOk} onOk={onOk} okText="保存" cancelText="取消">
                <EditForm initialValues={initValue} form={form} />
            </Modal>
        </React.Fragment>
    );
}

export default connect()(AddModal);
