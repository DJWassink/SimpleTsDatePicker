import * as React from 'react';
import {classNames, sameDays} from '../utils';

export interface DayProps extends React.TdHTMLAttributes<HTMLTableDataCellElement> {
    day: Date;
    value: Date;
    screen: Date;
    cursor: Date;
}
export const Day: React.SFC<DayProps> = ({day, value, screen, cursor, ...props}) => {
    const isPrevMonth = screen.getMonth() === 0 ? day.getMonth() === 11 : day.getMonth() === screen.getMonth() - 1;
    const isNextMonth = screen.getMonth() === 11 ? day.getMonth() === 0 : day.getMonth() === screen.getMonth() + 1;
    const isInThisMonth = !isPrevMonth && !isNextMonth;

    const classNamesString = classNames({
        day: true,
        grayed: !isInThisMonth,
        selected: sameDays(day, value),
        cursor: sameDays(day, cursor),
        today: sameDays(day, new Date())
    });

    return (
        <td {...props} className={classNamesString}>
            {day.getDate()}
        </td>
    );
};
