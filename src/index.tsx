import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as Utils from './utils';

export interface I18n {
    previousMonth: string;
    nextMonth: string;
    months: string[];
    weekdays: string[];
    weekdaysShort: string[];
}
export const i18nz: I18n = {
    previousMonth: 'Previous month',
    nextMonth: 'Next month',
    months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
};

export const abbreviationDays = (i18n: I18n, weekStart: number) => {
    return Utils.range(7).map((_, index) => {
        const dayIndex = index + weekStart;
        return dayIndex >= 7 ? i18n.weekdaysShort[dayIndex - 7] : i18n.weekdaysShort[dayIndex];
    });
};

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

    const classNames = Utils.classNames({
        day: true,
        grayed: !isInThisMonth,
        selected: Utils.sameDates(day, value),
        cursor: Utils.sameDates(day, cursor),
        today: Utils.sameDates(day, new Date())
    });

    return (
        <td {...props} className={classNames}>
            {day.getDate()}
        </td>
    );
};

export interface AbbreviationsProps extends React.HTMLAttributes<HTMLTableRowElement> {
    i18n: I18n;
    weekStart: number;
}
export const Abbreviations: React.SFC<AbbreviationsProps> = ({i18n, weekStart, ...props}) => {
    return (
        <tr className="weekdays" {...props}>
            {abbreviationDays(i18n, weekStart).map((day: string) => (
                <td key={day} colSpan={1}>
                    {day}
                </td>
            ))}
        </tr>
    );
};

export interface HeaderProps extends React.HTMLAttributes<HTMLTableRowElement> {
    i18n: I18n;
    screen: Date;
    onScreenChange: (screen: Date) => void;
}
export const Header: React.SFC<HeaderProps> = ({i18n, screen, onScreenChange, ...props}) => {
    return (
        <tr {...props}>
            <th colSpan={1}>
                <a className="chevron" onClick={() => onScreenChange(Utils.deltaDate(screen, 0, -1))}>
                    ‹
                </a>
            </th>
            <th colSpan={5}>
                {i18n.months[screen.getMonth()]} {screen.getFullYear()}
            </th>
            <th colSpan={1}>
                <a className="chevron" onClick={() => onScreenChange(Utils.deltaDate(screen, 0, 1))}>
                    ›
                </a>
            </th>
        </tr>
    );
};

interface DemoProps {
    i18n: I18n;
}
interface DemoState {
    value: Date;
    cursor: Date;
    screen: Date;
    month: number;
    weekStart: number;
}
class DemoContainer extends React.Component<DemoProps, DemoState> {
    public state = {
        value: new Date(2018, 1, 15),
        cursor: new Date(2018, 1, 10),
        screen: new Date(2018, 1, 15),
        month: 0,
        weekStart: 1
    };

    private onChange = (value: Date) => {
        this.setState({
            value,
            screen: value
        });
    };

    private onCursorChange = (cursor: Date) => {
        this.setState({cursor});
    };

    private onScreenChange = (screen: Date) => {
        this.setState({screen});
    };

    private onKeyDown = (e: React.KeyboardEvent<HTMLElement>, matrix: Date[][]) => {
        if (e.key === 'enter') {
            this.onChange(this.state.cursor);
            return;
        }

        const cursorInMatrix = Utils.inMatrix(matrix, this.state.cursor);
        let newCursor: Date | null = null;
        switch (e.key) {
            case 'ArrowDown': {
                newCursor = cursorInMatrix
                    ? Utils.deltaDate(this.state.cursor, 0, 0, 7)
                    : Utils.getFirstDayOfMonth(this.state.screen);
                break;
            }
            case 'ArrowUp': {
                newCursor = cursorInMatrix
                    ? Utils.deltaDate(this.state.cursor, 0, 0, -7)
                    : Utils.getLastDayOfMonth(this.state.screen);
                break;
            }
            case 'ArrowLeft': {
                newCursor = cursorInMatrix
                    ? Utils.deltaDate(this.state.cursor, 0, 0, -1)
                    : Utils.getLastDayOfMonth(this.state.screen);
                break;
            }
            case 'ArrowRight': {
                newCursor = cursorInMatrix
                    ? Utils.deltaDate(this.state.cursor, 0, 0, 1)
                    : Utils.getFirstDayOfMonth(this.state.screen);
                break;
            }
        }
        if (newCursor) {
            this.onCursorChange(newCursor);
            this.onScreenChange(newCursor);
        }
    };

    public render() {
        const matrix = Utils.generateMatrix(this.state.screen, this.state.weekStart);
        return (
            <DatePicker
                matrix={matrix}
                weekStart={this.state.weekStart}
                onKeyDown={e => this.onKeyDown(e, matrix)}
                renderDay={day => (
                    <Day
                        key={day.toString()}
                        day={day}
                        value={this.state.value}
                        screen={this.state.screen}
                        cursor={this.state.cursor}
                        onClick={() => this.onChange(day)}
                        onMouseEnter={() => this.onCursorChange(day)}
                    />
                )}
                renderAbbreviations={() => <Abbreviations i18n={this.props.i18n} weekStart={this.state.weekStart} />}
                renderHeader={() => (
                    <Header i18n={this.props.i18n} screen={this.state.screen} onScreenChange={this.onScreenChange} />
                )}
            />
        );
    }
}

ReactDOM.render(
    <div className="wrapper">
        <DemoContainer i18n={i18nz} />
    </div>,
    document.getElementById('root') as HTMLElement
);
