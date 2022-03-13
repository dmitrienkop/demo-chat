import { ChangeEvent } from "react";

export interface IFooterProps {
    onSend: (message: string) => void;
    onFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
};
