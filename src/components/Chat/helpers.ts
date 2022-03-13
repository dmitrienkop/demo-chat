import dateFormat from 'dateformat';
import { IMessage, IMessageFormatted } from '../Feed/types';

export const formatDateTime = (date: Date | number) => {
    const datetime = typeof date === 'number' ? new Date(date) : date;
    return dateFormat(datetime, 'DDDD h:MM:sstt');
};

export const formatMessages = (messages: IMessage[]): IMessageFormatted[] =>
    messages.map((message) => ({
        ...message,
        datetime: formatDateTime(message.timestamp)
    }));
