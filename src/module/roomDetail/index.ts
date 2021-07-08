import {call, Interval, Loading, Module, register, SagaGenerator} from "core-fe";
import {RootState} from "type/state";
import {listItem, State} from "./type";
import Detail from "./component/Detail";
import {RoomDetailAJAXWebService} from "service/RoomDetailAJAXWebService";

const initialState: State = {
    timeList: [],
    userName: "123123",
};

class RoomDetailModule extends Module<RootState, "roomDetail"> {
    *getRoomDetail(id: string | null) {
        const {date} = this.rootState.router.location.query;
        const res = yield* call(RoomDetailAJAXWebService.list, id, date);

        this.setState({timeList: res.data});
    }

    *deleteItem(id: string | null) {
        const res = yield* call(RoomDetailAJAXWebService.deleteItem, id);
        if (!res) {
            throw "删除失败";
        }
        const {timeList} = this.state;

        this.setState({
            timeList: timeList.map(item => {
                if (item.user === id) {
                    return {
                        time: item.time,
                        status: false,
                        user: null,
                        use: null,
                        useDescription: null,
                        participant: [],
                    };
                }
                return item;
            }),
        });
    }

    *editItem(term: listItem) {
        const res = yield* call(RoomDetailAJAXWebService.deleteItem);
        if (!res) {
            throw "修改失败";
        }
        const {timeList} = this.state;

        this.setState({
            timeList: timeList.map(item => {
                if (item.time[1] === term.time[1]) {
                    return {...term, status: true};
                }
                return item;
            }),
        });
    }

    override *onEnter(): SagaGenerator {
        const [, , id] = this.rootState.router.location.pathname.split("/");
        yield* this.getRoomDetail(id);
    }
}

const module = register(new RoomDetailModule("roomDetail", initialState));
export const actions = module.getActions();
export const RoomDetail = module.attachLifecycle(Detail);
