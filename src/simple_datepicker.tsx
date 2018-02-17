import * as React from 'react';
import {I18n, i18n as defaultI18n} from './i18n';
import {DatePicker} from './components/stateless_datepicker';
import {Day} from './components/day';
import {Header} from './components/header';
import {Abbreviations} from './components/abbreviations';
import {generateMatrix, isInMatrix, deltaDate, getFirstDayOfMonth, getLastDayOfMonth} from './utils';

export function defaultOnKeyDown(
    e: React.KeyboardEvent<HTMLElement>,
    matrix: Date[][],
    onChange: (date: Date) => void,
    onScreenChange: (date: Date) => void,
    onCursorChange: (date: Date) => void,
    cursor: Date,
    screen: Date
) {
    if (e.key === 'enter') {
        onChange(cursor);
        return;
    }

    const cursorIsInMatrix = isInMatrix(matrix, cursor);
    let newCursor: Date | null = null;
    switch (e.key) {
        case 'ArrowDown': {
            newCursor = cursorIsInMatrix ? deltaDate(cursor, 0, 0, 7) : getFirstDayOfMonth(screen);
            break;
        }
        case 'ArrowUp': {
            newCursor = cursorIsInMatrix ? deltaDate(cursor, 0, 0, -7) : getLastDayOfMonth(screen);
            break;
        }
        case 'ArrowLeft': {
            newCursor = cursorIsInMatrix ? deltaDate(cursor, 0, 0, -1) : getLastDayOfMonth(screen);
            break;
        }
        case 'ArrowRight': {
            newCursor = cursorIsInMatrix ? deltaDate(cursor, 0, 0, 1) : getFirstDayOfMonth(screen);
            break;
        }
    }
    if (newCursor) {
        onCursorChange(newCursor);
        onScreenChange(newCursor);
    }
}

export interface SimpleDatepickerProps {
    i18n?: I18n;
    value: Date;
    weekStart?: number;
    onChange: (date: Date) => void;
}
export interface SimpleDatepickerState {
    cursor: Date;
    screen: Date;
}
export default class SimpleDatepicker extends React.Component<SimpleDatepickerProps, SimpleDatepickerState> {
    public state = {
        cursor: new Date(this.props.value),
        screen: new Date(this.props.value)
    };

    private onChange = (value: Date) => {
        this.setState({
            screen: value
        });
        this.props.onChange(value);
    };

    private onCursorChange = (cursor: Date) => {
        this.setState({cursor});
    };

    private onScreenChange = (screen: Date) => {
        this.setState({screen});
    };

    private onKeyDown = (keyDownEvent: React.KeyboardEvent<HTMLElement>, matrix: Date[][]) => {
        defaultOnKeyDown(
            keyDownEvent,
            matrix,
            this.onChange,
            this.onScreenChange,
            this.onCursorChange,
            this.state.cursor,
            this.state.screen
        );
    };

    public render() {
        const weekStart = this.props.weekStart || 0;
        const i18n = this.props.i18n || defaultI18n;
        const matrix = generateMatrix(this.state.screen, weekStart);
        return (
            <DatePicker
                matrix={matrix}
                weekStart={weekStart}
                onKeyDown={e => this.onKeyDown(e, matrix)}
                renderDay={day => (
                    <Day
                        key={day.toString()}
                        day={day}
                        value={this.props.value}
                        screen={this.state.screen}
                        cursor={this.state.cursor}
                        onClick={() => this.onChange(day)}
                        onMouseEnter={() => this.onCursorChange(day)}
                    />
                )}
                renderAbbreviations={() => <Abbreviations i18n={i18n} weekStart={weekStart} />}
                renderHeader={() => (
                    <Header i18n={i18n} screen={this.state.screen} onScreenChange={this.onScreenChange} />
                )}
            />
        );
    }
}
