import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SimpleDatepicker from './simple_datepicker';

interface DemoState {
    value: Date;
}

class DemoContainer extends React.Component<{}, DemoState> {
    public state = {
        value: new Date()
    };
    private onValueChange = (value: Date) => {
        this.setState({value});
    };
    public render() {
        return <SimpleDatepicker value={this.state.value} onChange={this.onValueChange} />;
    }
}

ReactDOM.render(
    <div className="wrapper">
        <DemoContainer />
    </div>,
    document.getElementById('root') as HTMLElement
);
