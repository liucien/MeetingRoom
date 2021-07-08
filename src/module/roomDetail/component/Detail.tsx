import "./Detail.less";
import React, {Fragment} from "react";
import {connect, DispatchProp} from "react-redux";
import {actions} from "module/roomDetail";
import {RootState} from "type/state";
import {State as StateProps, listItem} from "../type";
import {Card} from "antd";
import DetailModal from "./DetailModal";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteBtn from "./DeleteBtn";

interface Props extends StateProps, DispatchProp {}

function Detail({timeList, dispatch, userName}: Props) {
    const onDelete = (item: listItem) => {
        dispatch(actions.getRoomDetail(item.user));
    };

    return (
        <Fragment>
            <AddModal timeList={timeList} userName={userName} />
            {timeList.map(item => {
                const [, time] = item.time;

                return (
                    <Card size="small" title={time} key={time} extra={<a style={{color: item.status ? "red" : "#09d"}}>状态：{item.status ? "占用" : "空闲"}</a>}>
                        <p>使用者：{item.user || "-"}</p>
                        <p>用途：{item.use || "-"}</p>
                        <div className="operate">
                            <span>操作：</span>
                            {item.status ? (
                                <Fragment>
                                    <DetailModal item={item} />
                                    {item.user === userName && (
                                        <Fragment>
                                            <EditModal item={item} />
                                            <DeleteBtn item={item} onConfirm={onDelete} />
                                        </Fragment>
                                    )}
                                </Fragment>
                            ) : (
                                <EditModal item={item} userName={userName} title="新增" />
                            )}
                        </div>
                    </Card>
                );
            })}
        </Fragment>
    );
}

const mapStateToProps = (state: RootState): StateProps => {
    const {timeList, userName} = state.app.roomDetail;

    return {
        timeList,
        userName,
    };
};

export default connect(mapStateToProps)(Detail);
