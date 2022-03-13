import React from 'react';
import css from './Header.module.css';
import { IHeaderProps } from './types';

export const Header = ({ name, status, onSignOut }: IHeaderProps) =>
    <div className={css.statusBox}>
        <div className={css.user}>
            <h2 className={css.userName} title={name}>{name}</h2>
            <span className={css.status} title={status}>{status}</span>
        </div>
        <span className={css.logOut} onClick={onSignOut}>Log out</span>
    </div>;
