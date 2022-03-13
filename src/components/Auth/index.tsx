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
    const [formState, setFormState] = useState<IAuthFormState>(INITIAL_AUTH_FORM_STATE);
    const [validationState, setValidationState] = useState<IAuthFormValidationState>(INITIAL_AUTH_FORM_VALIDATION_STATE);
    const [error, setError] = useState<string|null>(null);

    const createUser = async () => {
        try {
            await auth.createUserWithEmailAndPassword(
                formState[EAuthFormField.Email],
                formState[EAuthFormField.Password]
            );
        } catch (error: any) {
            setError(error.message);
        }
    };

    const signIn = async () => {
        try {
            await auth.signInWithEmailAndPassword(
                formState[EAuthFormField.Email],
                formState[EAuthFormField.Password]
            );
        } catch (error: any) {
            setError(error.message);
        }
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isValidForm = validationState[EAuthFormField.Email]
            && validationState[EAuthFormField.Password];
        if (isValidForm) {
            return isReg ? createUser() : signIn();
        }
    };

    const validateForm = (type: EAuthFormField, value: string) => {
        if (type === EAuthFormField.Email) {
            setValidationState({
                ...validationState,
                [EAuthFormField.Email]: Boolean(
                    String(value)
                        .toLowerCase()
                        .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
                )
            });
        }

        if (type === EAuthFormField.Password) {
            setValidationState({
                ...validationState,
                [EAuthFormField.Password]: Boolean(value)
            });
        }
    };

    const onChange = (type: EAuthFormField) =>
        (event: React.ChangeEvent<HTMLInputElement> | React.ClipboardEvent<HTMLInputElement>) => {
            setFormState({
                ...formState,
                [type]: event.currentTarget.value
            });
            validateForm(type, event.currentTarget.value);
        };

    return <form className={css.auth} onSubmit={onSubmit}>
        <h2 className={css.title}>
            {isReg ? 'Register Individual Account!' : 'Login'}
        </h2>

        <label className={classNames(css.field, {
            [css.hasError]: validationState[EAuthFormField.Email] === false
        })}>
            <span className={css.label}>Your email</span>
            <input
                className={css.input}
                type="text"
                name="email"
                onChange={onChange(EAuthFormField.Email)}
                onPaste={onChange(EAuthFormField.Email)}
                onCut={onChange(EAuthFormField.Email)}
            />
        </label>
        <label className={classNames(css.field, {
            [css.hasError]: validationState[EAuthFormField.Password] === false
        })}>
            <span className={css.label}>Password</span>
            <input
                className={css.input}
                type="password"
                name="password"
                onChange={onChange(EAuthFormField.Password)}
                onPaste={onChange(EAuthFormField.Password)}
                onCut={onChange(EAuthFormField.Password)}
            />
        </label>

        {error
            ? <span className={css.error}>{error}</span>
            : null}

        <button
            type="submit"
            className={css.submit}
        />
    </form>;
};
