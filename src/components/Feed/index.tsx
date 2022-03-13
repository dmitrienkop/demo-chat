import React, { useEffect } from 'react';
import classNames from 'classnames';
import css from './Feed.module.css';
import { IFeedProps } from './types';

export const Feed = ({ activeUserUID, items }: IFeedProps) => {
    const endRef = React.createRef<HTMLDivElement>();

    useEffect(() => {
        endRef.current && endRef.current.scrollIntoView();
    });

    return <div className={css.chat}>
        {items.map(({ message, datetime, uid, url }, index) =>
            <div className={classNames(css.message, css.unread, {
                [css.mine]: uid === activeUserUID,
                [css.link]: Boolean(url)
            })} key={index}>
                {url
                    ? <a
                        className={css.bubble}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {message}
                    </a>
                    : <span className={css.bubble}>{message}</span>}

                {datetime
                    ? <span
                        className={css.datetime}
                    >
                        {datetime}
                    </span>
                    : null}
            </div>)}
            <div ref={endRef} />
    </div>;
};
