import {listItem} from "../module/roomDetail/type";

export interface ListProductResponse {
    data: Array<listItem>;
}

const getMockData = (date: string) => {
    const data = new Array(12).fill({});
    return data.map((_, idx) => {
        const status: boolean = !!Math.round(Math.random());
        const user: string | null = status ? Math.random().toString(36).substr(2) : null;
        const use: string | null = status ? "开会" : null;
        const useDescription: string | null = status ? `${use} ${user}` : null;
        const participant: string[] | null = status ? ["aaa", "bbb", "ccc"] : [];

        return {
            time: [date, `${idx + 9}:00 ~ ${idx + 10}:00`],
            status,
            user: idx === 0 && status ? "123123" : user,
            use,
            useDescription,
            participant,
        };
    });
};

export class RoomDetailAJAXWebService {
    static list(id: string | null, date: string): Promise<ListProductResponse> {
        return Promise.resolve({data: getMockData(date)});
    }
    static deleteItem(id?: string | null): Promise<boolean> {
        return Promise.resolve(true);
    }
}
