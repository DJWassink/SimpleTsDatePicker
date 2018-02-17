import * as React from 'react';
import {I18n} from '../i18n';
import {deltaDate} from '../utils';

export interface HeaderProps extends React.HTMLAttributes<HTMLTableRowElement> {
    i18n: I18n;
    screen: Date;
    onScreenChange: (screen: Date) => void;
}
export const Header: React.SFC<HeaderProps> = ({i18n, screen, onScreenChange, ...props}) => {
    return (
        <tr {...props}>
            <th colSpan={1}>
                <a className="chevron" onClick={() => onScreenChange(deltaDate(screen, 0, -1))}>
                    ‹
                </a>
            </th>
            <th colSpan={5}>
                {i18n.months[screen.getMonth()]} {screen.getFullYear()}
            </th>
            <th colSpan={1}>
                <a className="chevron" onClick={() => onScreenChange(deltaDate(screen, 0, 1))}>
                    ›
                </a>
            </th>
        </tr>
    );
};
