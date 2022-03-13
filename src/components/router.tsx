import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AUTH_ROUTE, CHAT_ROUTE } from '../constants';
import { privateRoutes, publicRoutes } from '../routes';
import { AppContext } from './App';

const AppRouter = () => {
    const { auth } = useContext(AppContext);
    const [user] = useAuthState(auth);

    return user
        ? <Routes>
            {privateRoutes.map(({ path, Component }) =>
                <Route path={path} element={<Component />} key={path} />)}
            <Route path="*" element={<Navigate to={CHAT_ROUTE} replace />} />
        </Routes>
        : <Routes>
            {publicRoutes.map(({ path, Component }) =>
                <Route path={path} element={<Component />} key={path} />)}
            <Route path="*" element={<Navigate to={AUTH_ROUTE} replace />} />
        </Routes>;
};

export default AppRouter;
