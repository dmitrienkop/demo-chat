import React, { ChangeEvent, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { AppContext } from '../App';
import { Header } from '../Header';
import { Feed } from '../Feed';
import { IMessage } from '../Feed/types';
import { Footer } from '../Footer';
import { Loader } from '../Loader';
import { MESSAGES_COLLECTION } from './constants';
import { formatDateTime, formatMessages } from './helpers';
import css from './Chat.module.css';

export const Chat = () => {
    const { auth, firestore, storage } = useContext(AppContext);
    const [user] = useAuthState(auth);
    const [messages = [], loading] = useCollectionData(
        firestore.collection(MESSAGES_COLLECTION).orderBy('timestamp')
    );

    const onSignOut = () => auth.signOut();

    const onSend = async (message: string, url?: string) =>
        firestore.collection(MESSAGES_COLLECTION).add({
            uid: user.uid,
            email: user.email,
            message: message,
            timestamp: Date.now(),
            url: url || null
        });

    const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const st = storage.ref(file.name);
            const upload = st.put(file);
            upload.on('state_changed', null, null, async () => {
                const url = await st.getDownloadURL();
                onSend(file.name, url);
            });
        }
    };

    if (loading || !user) {
        return <Loader />;
    }

    const userStatus = `Online - Last seen ${formatDateTime(user.metadata.lastSignInTime)}`;

    return <div className={css.container}>
        <header className={css.header}>
            <Header
                name={user.email}
                status={userStatus}
                onSignOut={onSignOut}
            />
        </header>

        <section className={css.feed}>
            <Feed
                activeUserUID={user.uid}
                items={formatMessages(messages as IMessage[])}
            />
        </section>

        <footer className={css.footer}>
            <Footer
                onSend={onSend}
                onFileUpload={onFileUpload}
            />
        </footer>
    </div>;
};
