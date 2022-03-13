import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

export interface IFB {
    auth: firebase.auth.Auth;
    firestore: firebase.firestore.Firestore;
    storage: firebase.storage.Storage;
}

export const initFirebase = (): IFB => {
    firebase.initializeApp({
        apiKey: 'AIzaSyDGnX2XcatBZSzGcVJhseLLZu7SWlwXph4',
        authDomain: 'chat-react-c2874.firebaseapp.com',
        projectId: 'chat-react-c2874',
        storageBucket: 'chat-react-c2874.appspot.com',
        messagingSenderId: '155993922802',
        appId: '1:155993922802:web:865d4484f63d228db9046b',
        measurementId: 'G-WEQDN9T19H'
    });

    return {
        auth: firebase.auth(),
        firestore: firebase.firestore(),
        storage: firebase.storage()
    };
};
