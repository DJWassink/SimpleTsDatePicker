import './style.sass';

import * as React from 'react';

import {Abbreviations} from './components/abbreviations';
import {Day} from './components/day';
import {Header} from './components/header';
import {DatePicker} from './components/stateless_datepicker';
import {I18n, i18n as defaultI18n} from './i18n';
import {deltaDate, generateMatrix, getFirstDayOfMonth, getLastDayOfMonth, isInMatrix, sameDays} from './utils';

export * from './utils';
export * from './i18n';
export * from './components/stateless_datepicker';
export * from './components/header';
export * from './components/day';
export * from './components/abbreviations';

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
        case 'Enter': {
            onChange(cursor);
            break;
        }
    }
    if (newCursor) {
        onCursorChange(newCursor);
        onScreenChange(newCursor);
    }
}

export interface SimpleDatePickerProps {
    i18n?: I18n;
    value: Date;
    weekStart?: number;
    onChange: (value: Date) => void;

    renderDay?: (day: Date, value: Date, screen: Date, cursor: Date) => JSX.Element;
    renderHeader?: (i18n: I18n, screen: Date, onScreenChange: (screen: Date) => void) => JSX.Element;
    renderAbbreviations?: (i18n: I18n, weekStart: number) => JSX.Element;
}

export interface SimpleDatePickerState {
    cursor: Date;
    screen: Date;
}

export class SimpleDatePicker extends React.Component<SimpleDatePickerProps, SimpleDatePickerState> {
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

    private renderDay = (day: Date, value: Date, screen: Date, cursor: Date) => {
        return (
            <Day
                key={day.toString()}
                day={day}
                value={value}
                screen={screen}
                cursor={cursor}
                onClick={() => this.onChange(day)}
                onMouseMove={() => {
                    if (!sameDays(day, this.state.cursor)) {
                        this.onCursorChange(day);
                    }
                }}
            />
        );
    };

    private renderAbbreviations = (i18n: I18n, weekStart: number) => {
        return <Abbreviations i18n={i18n} weekStart={weekStart} />;
    };

    private renderHeader = (i18n: I18n, screen: Date, onScreenChange: (screen: Date) => void) => {
        return <Header i18n={i18n} screen={screen} onScreenChange={onScreenChange} />;
    };

    public render() {
        const weekStart = this.props.weekStart || 0;
        const i18n = this.props.i18n || defaultI18n;
        const matrix = generateMatrix(this.state.screen, weekStart);

        const renderDay = (day: Date) =>
            (this.props.renderDay || this.renderDay)(day, this.props.value, this.state.screen, this.state.cursor);
        const abbreviations = (this.props.renderAbbreviations || this.renderAbbreviations)(i18n, weekStart);
        const header = (this.props.renderHeader || this.renderHeader)(i18n, this.state.screen, this.onScreenChange);

        return (
            <DatePicker
                matrix={matrix}
                onKeyDown={e => this.onKeyDown(e, matrix)}
                renderDay={renderDay}
                abbreviations={abbreviations}
                header={header}
            />
        );
    }
}
