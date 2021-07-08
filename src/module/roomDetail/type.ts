export interface listItem {
    time: string[];
    status: boolean;
    user: string | null;
    use: string | null;
    useDescription: string | null;
    participant: string[] | null;
}

export interface State {
    timeList: Array<listItem>;
    userName: string;
}
