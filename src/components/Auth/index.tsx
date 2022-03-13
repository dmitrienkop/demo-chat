import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { REG_ROUTE } from '../../constants';
import { AppContext } from '../App';
import { IAuthFormState, IAuthFormValidationState } from './types';
import { EAuthFormField } from './enums';
import { INITIAL_AUTH_FORM_STATE, INITIAL_AUTH_FORM_VALIDATION_STATE } from './constants';
import css from './Auth.module.css';

export const Auth = () => {
    const location = useLocation();
    const isReg = location.pathname === REG_ROUTE;
    const { auth } = useContext(AppContext);
    const [authFormState, setAuthFormState] = useState<IAuthFormState>(INITIAL_AUTH_FORM_STATE);
    const [authFormValidationState, setAuthFormValidationState] = useState<IAuthFormValidationState>(INITIAL_AUTH_FORM_VALIDATION_STATE);
    const [error, setError] = useState<string|null>(null);

    const createUser = async () => {
        try {
            await auth.createUserWithEmailAndPassword(
                authFormState[EAuthFormField.Email],
                authFormState[EAuthFormField.Password]
            );
        } catch (error: any) {
            setError(error.message);
        }
    };

    const signIn = async () => {
        try {
            await auth.signInWithEmailAndPassword(
                authFormState[EAuthFormField.Email],
                authFormState[EAuthFormField.Password]
            );
        } catch (error: any) {
            setError(error.message);
        }
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isValidForm = authFormValidationState[EAuthFormField.Email]
            && authFormValidationState[EAuthFormField.Password];
        if (isValidForm) {
            return isReg ? createUser() : signIn();
        }
    };

    const validateForm = (type: EAuthFormField) => {
        if (type === EAuthFormField.Email) {
            setAuthFormValidationState({
                ...authFormValidationState,
                [EAuthFormField.Email]: Boolean(
                    String(authFormState[EAuthFormField.Email])
                        .toLowerCase()
                        .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
                )
            });
        }

        if (type === EAuthFormField.Password) {
            setAuthFormValidationState({
                ...authFormValidationState,
                [EAuthFormField.Password]: Boolean(authFormState[EAuthFormField.Password])
            });
        }
    };

    const onChange = (type: EAuthFormField) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthFormState({
            ...authFormState,
            [type]: event.target.value
        });
        validateForm(type);
    };

    return <form className={css.auth} onSubmit={onSubmit}>
        <h2 className={css.title}>
            {isReg ? 'Register Individual Account!' : 'Login'}
        </h2>

        <label className={classNames(css.field, {
            [css.hasError]: authFormValidationState[EAuthFormField.Email] === false
        })}>
            <span className={css.label}>Your email</span>
            <input className={css.input} type="text" name="email" onChange={onChange(EAuthFormField.Email)} />
        </label>
        <label className={classNames(css.field, {
            [css.hasError]: authFormValidationState[EAuthFormField.Password] === false
        })}>
            <span className={css.label}>Password</span>
            <input className={css.input} type="password" name="password" onChange={onChange(EAuthFormField.Password)} />
        </label>

        {error ? <span className={css.error}>{error}</span> : null}

        <button type="submit" className={css.submit} />
    </form>;
};
