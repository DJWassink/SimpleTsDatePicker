import * as React from 'react';

export interface PickerProps extends React.TableHTMLAttributes<HTMLTableElement> {
    matrix: Date[][];
    renderDay: (date: Date) => JSX.Element;
    header: JSX.Element;
    abbreviations: JSX.Element;
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
}

export const DatePicker: React.SFC<PickerProps> = ({matrix, renderDay, header, abbreviations, onKeyDown, ...props}) => {
    return (
        <table className="fus-datepicker" tabIndex={0} onKeyDown={onKeyDown} {...props}>
            <thead>
                {header}
                {abbreviations}
            </thead>
            <tbody>
                {matrix.map(row => <tr key={'row' + row[0].toString()}>{row.map(date => renderDay(date))}</tr>)}
            </tbody>
        </table>
    );
};
