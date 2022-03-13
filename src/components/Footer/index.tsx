import React, { ChangeEvent, FormEvent, useState } from 'react';
import { ReactComponent as AttachIcon } from './attach.svg';
import { ReactComponent as SendIcon } from './send.svg';
import { IFooterProps } from './types';
import css from './Footer.module.css';

export const Footer = ({ onSend, onFileUpload }: IFooterProps) => {
    const [newMessage, setNewMessage] = useState<string>('');
    const onChange = (event: FormEvent<HTMLInputElement>) =>
        setNewMessage(event.currentTarget.value);

    const sendMessage = () => {
        if (newMessage) {
            onSend(newMessage);
            setNewMessage('');
        }
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendMessage();
    };

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        sendMessage();
        onFileUpload(event);
    };

    return <form className={css.newMessage} onSubmit={onSubmit}>
        <label>
            <AttachIcon
                className={css.attach}
            />
            <input
                className={css.file}
                type="file"
                name="upload"
                onChange={onFileChange}
            />
        </label>

        <input
            className={css.newText}
            type="text"
            name="newMessage"
            placeholder="Type your message here..."
            value={newMessage}
            onInput={onChange}
            autoComplete="off"
        />

        <button
            className={css.submit}
            type="submit"
        >
            <SendIcon
                className={css.send}
            />
        </button>
    </form>;
};