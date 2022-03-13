import React, { createContext, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter } from 'react-router-dom';
import { IFB, initFirebase } from '../../firebase';
import { Loader } from '../Loader';
import AppRouter from '../router';
import css from './App.module.css';

const fb = initFirebase();
export const AppContext = createContext<IFB>(fb);

export const App = () => {
    const { auth } = useContext(AppContext);
    const [_user, isLoadingAuthState] = useAuthState(auth);

    return isLoadingAuthState
        ? <Loader visible={true} />
        : <AppContext.Provider value={fb}>
            <main className={css.app}>
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            </main>
        </AppContext.Provider>;
};
