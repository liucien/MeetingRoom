import {call, Interval, Loading, Module, register, SagaGenerator} from "core-fe";
import {ProductAJAXWebService} from "service/ProductAJAXWebService";
import {RootState} from "type/state";
import {listParams} from "type/api";
import ProductListComponent from "./component/ProductList";
import {LOADING_PRODUCT_LIST, State} from "./type";

const initialState: State = {
    roomList: [],
};

class ProductModule extends Module<RootState, "product"> {
    @Loading(LOADING_PRODUCT_LIST)
    *loadProductList(params?: listParams): SagaGenerator {
        const res = yield* call(ProductAJAXWebService.list, params);

        this.setState({roomList: res.data});
    }

    override *onEnter(): SagaGenerator {
        yield* this.loadProductList();
    }

    @Interval(3)
    override *onTick(): SagaGenerator {
        // console.log("from product module, print every 3 secs");
    }
}

const module = register(new ProductModule("product", initialState));
export const actions = module.getActions();
export const ProductList = module.attachLifecycle(ProductListComponent);
