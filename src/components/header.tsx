import * as React from 'react';

import {I18n} from '../i18n';
import {deltaDate, range} from '../utils';

export interface HeaderProps extends React.HTMLAttributes<HTMLTableRowElement> {
    i18n: I18n;
    screen: Date;
    onScreenChange: (screen: Date) => void;
}

const yearOption = (year: number) => {
    return (
        <option key={year} value={year}>
            {year}
        </option>
    );
};

export const Header: React.SFC<HeaderProps> = ({i18n, screen, onScreenChange, ...props}) => {
    const screenYear = screen.getFullYear();
    const yearRange = range(8);

    const minusYears = yearRange.map(value => yearOption(screenYear - yearRange.length + value));
    const plusYears = yearRange.map(value => yearOption(screenYear + value + 1));
    const yearOptions = [...minusYears, yearOption(screenYear), ...plusYears];

    return (
        <tr {...props}>
            <th colSpan={1}>
                <a className="chevron" onClick={() => onScreenChange(deltaDate(screen, 0, -1))}>
                    ‹
                </a>
            </th>
            <th colSpan={5}>
                <select
                    value={screen.getMonth()}
                    onChange={e =>
                        onScreenChange(new Date(screen.getFullYear(), parseInt(e.target.value, 10), screen.getDate()))
                    }>
                    {i18n.months.map((month, index) => (
                        <option key={month} value={index}>
                            {month}
                        </option>
                    ))}
                </select>
                <select
                    value={screen.getFullYear()}
                    onChange={e =>
                        onScreenChange(new Date(parseInt(e.target.value, 10), screen.getMonth(), screen.getDate()))
                    }>
                    {yearOptions}
                </select>
            </th>
            <th colSpan={1}>
                <a className="chevron" onClick={() => onScreenChange(deltaDate(screen, 0, 1))}>
                    ›
                </a>
            </th>
        </tr>
    );
};
