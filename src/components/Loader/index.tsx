import React from 'react';
import classNames from 'classnames';
import { ISpinnerProps } from './types';
import css from './Loader.module.css';

export const Loader = ({ visible }: ISpinnerProps) =>
    <div className={classNames(css.loader, {
        [css.visible]: Boolean(visible)
    })} />;
