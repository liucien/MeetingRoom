import "./Detail.less";
import React, {Fragment, useState} from "react";
import {Modal, Form, Button} from "antd";
import {listItem} from "../type";
import EditForm from "./EditForm";
import DeleteBtn from "./DeleteBtn";
import {actions} from "module/roomDetail";
import {connect, DispatchProp} from "react-redux";

interface ContentProps {
    item: listItem;
    onEdit?: () => void;
    onDelete?: (term: listItem) => void;
    onSave?: (term: listItem) => void;
    onCancel?: () => void;
}
const DetailContent = ({item, onEdit, onDelete}: ContentProps) => {
    const onConfirm = (term: listItem) => {
        onDelete && onDelete(term);
    };

    return (
        <Fragment>
            <p>状态：{item.status ? "占用" : "空闲"}</p>
            <p>使用者：{item.user || "-"}</p>
            <p>用途：{item.use || "-"}</p>
            <p>用途描述：{item.useDescription}</p>
            <p>参会人：{item.participant?.join(",")}</p>
            <p className="operate">
                <span>操作：</span>
                <a onClick={onEdit}>编辑</a>
                <DeleteBtn item={item} onConfirm={onConfirm} />
            </p>
        </Fragment>
    );
};

const FormEditWarp = ({item, onCancel, onSave}: ContentProps) => {
    const [form] = Form.useForm();
    const onSaveWarp = async () => {
        await form.validateFields();

        onSave && onSave(form.getFieldsValue(true));
    };

    return (
        <Fragment>
            <EditForm initialValues={item} form={form} />
            <div style={{textAlign: "right"}}>
                <Button onClick={onCancel}>取消</Button>
                <Button onClick={onSaveWarp} type="primary" style={{marginLeft: 12}}>
                    保存
                </Button>
            </div>
        </Fragment>
    );
};

const FormEdit = connect()(FormEditWarp);

interface Props extends DispatchProp {
    item: listItem;
}

function DetailModal({item, dispatch}: Props) {
    const [, time] = item.time;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const onEdit = () => {
        setIsEdit(true);
    };

    const onCancel = () => {
        setIsEdit(false);
    };

    const onDelete = (item: listItem) => {
        dispatch(actions.deleteItem(item.user));
        setIsModalVisible(false);
    };

    const onSave = (item: listItem) => {
        dispatch(actions.editItem(item));
        onCancel();
    };
    return (
        <React.Fragment>
            <a onClick={showModal}>详情</a>
            <Modal title={time} visible={isModalVisible} footer={null} onCancel={handleOk}>
                {isEdit ? <FormEdit item={item} onCancel={onCancel} onSave={onSave} /> : <DetailContent item={item} onEdit={onEdit} onDelete={onDelete} />}
            </Modal>
        </React.Fragment>
    );
}

export default connect()(DetailModal);
