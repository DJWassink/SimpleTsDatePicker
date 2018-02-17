import * as React from 'react';
import {abbreviationDays} from '../utils';
import {I18n} from '../i18n';

export interface AbbreviationsProps extends React.HTMLAttributes<HTMLTableRowElement> {
    i18n: I18n;
    weekStart: number;
}
export const Abbreviations: React.SFC<AbbreviationsProps> = ({i18n, weekStart, ...props}) => {
    return (
        <tr className="weekdays" {...props}>
            {abbreviationDays(i18n.weekdaysShort, weekStart).map((day: string) => (
                <td key={day} colSpan={1}>
                    {day}
                </td>
            ))}
        </tr>
    );
};
