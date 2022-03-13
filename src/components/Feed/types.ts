export interface IMessage {
    message: string;
    uid: string;
    email: string;
    timestamp: number;
    url?: string;
}

export interface IMessageFormatted extends IMessage {
    datetime: string;
}

export interface IFeedProps {
    activeUserUID?: string;
    items: IMessageFormatted[];
}
