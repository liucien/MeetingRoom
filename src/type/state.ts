import {State} from "core-fe";
import {State as ProductState} from "module/product/type";
import {State as UserState} from "module/user/type";
import {State as RoomDetailState} from "module/roomDetail/type";

export interface RootState extends State {
    app: {
        home: {};
        user: UserState;
        product: ProductState;
        roomDetail: RoomDetailState;
    };
}
