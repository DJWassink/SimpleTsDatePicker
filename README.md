# SimpleDatepicker
[![Bundlephobia](https://img.shields.io/badge/dynamic/json.svg?label=minified%20size&url=https%3A%2F%2Fbundlephobia.com%2Fapi%2Fsize%3Fpackage%3Dsimple-ts-date-picker%26record%3Dtrue&query=size&suffix=%20bytes&colorB=%230a7bbc)](https://bundlephobia.com/result?p=simple-ts-date-picker)
[![Bundlephobia](https://img.shields.io/badge/dynamic/json.svg?label=minzipped%20size&url=https%3A%2F%2Fbundlephobia.com%2Fapi%2Fsize%3Fpackage%3Dsimple-ts-date-picker%26record%3Dtrue&query=gzip&suffix=%20bytes&colorB=%230a7bbc)](https://bundlephobia.com/result?p=simple-ts-date-picker)


Super simple but extensible datepicker

To get a simple idea about the default behavior check the demo: https://codesandbox.io/s/o4xvm0942z

## Components
This repo is split up in a few different sections, first the components section:
https://github.com/DJWassink/SimpleDatePicker/tree/master/src/components

Here are some stateless components which are each responsible for rendering a part of the datepicker,

1. abbreviations.tsx is responsible for rendering the abbreviations of easy weekday
2. day.tsx is responsible for redering a single cell in the datepicker, typically containing an number indicating the day of month.
3. header.tsx the default header contains two chevrons to navigate between the months and has two select dropdown to quickly navigate the months and 8 years up/down
4. stateless_datepicker.tsx is responsible for rendering each day.tsx in order of the passed matrix of dates, this component is the main container and gets passed the abbreviations, header and an function to render a single day.tsx

All of these components can be imported/overwritten to fit your needs. The most user friendly component is the statefull component called SimpleDatePicker which uses all these components to render a datepicker as can be seen here: https://codesandbox.io/s/o4xvm0942z this component has the following props:

```ts
interface SimpleDatePickerProps {
    i18n?: I18n;
    value: Date;
    weekStart?: number;
    onChange: (date: Date) => void;

    renderDay?: (date: Date) => JSX.Element;
    renderHeader?: (i18n: I18n) => JSX.Element;
    renderAbbreviations?: (i18n: I18n, weekStart: number) => JSX.Element;
}
```

As you can see the only required props are the `value` and `onChange` properties. The other props are used to customize the default behavior of the datepicker. The renderXXX props are used to be able to overwrite an existing part of the datepicker, an good example can be seen here: https://codesandbox.io/s/621v1nw0l3
