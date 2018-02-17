export interface I18n {
    previousMonth: string;
    nextMonth: string;
    months: string[];
    weekdays: string[];
    weekdaysShort: string[];
}

export const i18n: I18n = {
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
