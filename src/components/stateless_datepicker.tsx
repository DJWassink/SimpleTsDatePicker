import * as React from 'react';

export interface PickerProps extends React.TableHTMLAttributes<HTMLTableElement> {
    matrix: Date[][];
    weekStart: number;
    renderDay: (date: Date) => JSX.Element;
    renderHeader: () => JSX.Element;
    renderAbbreviations: () => JSX.Element;
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
}
export const DatePicker: React.SFC<PickerProps> = ({
    matrix,
    weekStart,
    renderDay,
    renderHeader,
    renderAbbreviations,
    onKeyDown,
    ...props
}) => {
    return (
        <table className="fus-datepicker" tabIndex={0} onKeyDown={onKeyDown} {...props}>
            <thead>
                {renderHeader()}
                {renderAbbreviations()}
            </thead>
            <tbody>
                {matrix.map(row => <tr key={'row' + row[0].toString()}>{row.map(date => renderDay(date))}</tr>)}
            </tbody>
        </table>
    );
};
