import React from 'react';
import Radio from '../Radio/Radio';

export default class RadioGroup extends React.Component {
    static propTyps = {
        name: React.PropTypes.string.isRequired
    };

    state = {
        value: this.props.defaultValue
    };

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    render() {
        let children = React.Children.map(this.props.children, (child) => {
            let props = {
                ...child.props,
                key: this.props.name,
                name: this.props.name,
                checked: this.state.value == child.props.value,
                onChange: ::this.handleChange
            }
            return <Radio {...props}></Radio>
        });

        return (
            <div style={{display: 'inline-block'}}>
               {children}
            </div>
        );
    }
}
