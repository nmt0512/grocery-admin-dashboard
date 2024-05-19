import { MessageInstance } from 'antd/es/message/interface';

export enum MessageType {
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error"
}

export const showMessage = (messageApi: MessageInstance, type: MessageType, content: string) => {

    messageApi.open({
        type: type,
        content: content,
    });
}