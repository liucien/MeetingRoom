import {ListProductResponse, GetProductResponse, CreateProductConfigResponse, listParams} from "type/api";
import {ajax} from "core-fe";

const mockData = [
    {name: "401", code: "401", remaining: "1", key: "1"},
    {name: "402", code: "402", remaining: "2", key: "2"},
];
const getList = (params?: listParams) => {
    if (params?.date) {
        return [
            {name: "401", code: "401", remaining: "10", key: "1"},
            {name: "402", code: "402", remaining: "20", key: "2"},
        ];
    }
    if (params?.name) {
        return mockData.filter(item => item.name === params.name);
    }

    return mockData;
};

export class ProductAJAXWebService {
    static list(params?: listParams): Promise<ListProductResponse> {
        return Promise.resolve({data: getList(params)});
    }
    static get(id: string): Promise<GetProductResponse> {
        return ajax("GET", "/ajax/product/:id", {id}, null);
    }
    static getChild(id: string, childId: string): Promise<GetProductResponse> {
        return ajax("GET", "/ajax/product/:id/child/:childId", {id, childId}, null);
    }
    static createConfig(): Promise<CreateProductConfigResponse> {
        return ajax("GET", "/ajax/product/create-config", {}, null);
    }
}
