export const classNames = (obj: {[key: string]: boolean}) => {
    return Object.keys(obj)
        .reduce((acc: string[], name) => (obj[name] ? [...acc, name] : acc), [])
        .join(' ');
};

export const range = (length: number) =>
    Array(length)
        .fill(null)
        .map((_, i) => i);

export const sameDays = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
};

export const deltaDate = (date: Date, yearDelta: number, monthDelta = 0, dayDelta = 0) => {
    return new Date(date.getFullYear() + yearDelta, date.getMonth() + monthDelta, date.getDate() + dayDelta);
};

export const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
export const getFirstDayOfWeek = (date: Date, weekStart: number) => {
    const diff = (date.getDay() < weekStart ? 7 : 0) + date.getDay() - weekStart;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - diff);
};

export const getLastDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);
export const getLastDayOfWeek = (date: Date, weekStart: number) => {
    const diff = (date.getDay() < weekStart ? -7 : 0) + 6 - (date.getDay() - weekStart);
    return new Date(date.getFullYear(), date.getMonth(), date.getDay() + diff);
};

export const generateMatrix = (date: Date, weekStart: number) => {
    const firstDayOfMonth = getFirstDayOfMonth(date);
    const startDate = getFirstDayOfWeek(firstDayOfMonth, weekStart);

    return range(6).map((_, i) => {
        return range(7).map((__, j) => {
            return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i * 7 + j);
        });
    });
};

export const isInMatrix = (matrix: Date[][], date: Date) => {
    return matrix.some(row => {
        return row.some(rowDate => sameDays(rowDate, date));
    });
};

export const abbreviationDays = (abbreviations: string[], weekStart: number) => {
    return range(7).map((_, index) => {
        const dayIndex = index + weekStart;
        return dayIndex >= 7 ? abbreviations[dayIndex - 7] : abbreviations[dayIndex];
    });
};
