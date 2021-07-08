import React from "react";
import {useHistory} from "react-router";
import {Table, Form} from "antd";
import {actions} from "module/product";
import {connect, DispatchProp} from "react-redux";
import {RootState} from "type/state";
import QueryBox, {values} from "./QueryBox";
import {listParams} from "type/api";
import moment from "moment";

interface StateProps {
    roomList: Array<{}>;
}

interface Props extends StateProps, DispatchProp {}

const OperationBox = ({id, values}: {id: string; values: values}) => {
    const history = useHistory();
    const goDetail = () => {
        history.push(`/roomDetail/${id}?date=${moment(values.date).format("YYYY-MM-DD")}`);
    };

    return <a onClick={goDetail}>详情</a>;
};
const columns = (params: values) => {
    return [
        {
            title: "会议室名称",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "会议室编号",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "当天空余时长",
            dataIndex: "remaining",
            key: "remaining",
        },
        {
            title: "操作",
            key: "action",
            render: ({code}: {code: string}) => <OperationBox id={code} values={params} />,
        },
    ];
};

function ProductList({roomList, dispatch}: Props) {
    const [form] = Form.useForm();
    const onQuery = (values: listParams) => {
        dispatch(actions.loadProductList(values));
    };

    return (
        <React.Fragment>
            <QueryBox onQuery={onQuery} form={form} />
            <Table dataSource={roomList} columns={columns(form.getFieldsValue())} />
        </React.Fragment>
    );
}

const mapStateToProps = (state: RootState): StateProps => {
    const {roomList} = state.app.product;

    return {
        roomList,
    };
};

export default connect(mapStateToProps)(ProductList);
