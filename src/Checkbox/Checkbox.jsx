import styles from './Checkbox.css';

import React from 'react';
import Icon from 'react-fa';
import cx from 'classnames';

export default class Checkbox extends React.Component {
    static propTypes = {
        label: React.PropTypes.string
    }

    state = {
        checked: !!this.props.defautlChecked
    }

    handlCheck(...args) {
        if (args[0].target.tagName !== 'INPUT') {
            this.setState({ checked: !this.state.checked });
        }
    }

    render() {
        let { className, label, ...other } = this.props;
        let classNames = cx(
            styles['checkbox'],
            className,
            {
                [styles['checked']]: this.state.checked,
                [styles['disabled']]: this.props.disabled
            }
        );

        return (
            <label className={classNames} onClick={this.props.disabled ? null : ::this.handlCheck}>
                <input className={styles['input']} {...other} type="checkbox" />
                <Icon className={styles['icon']} name="check"></Icon>
                {label}
            </label>
        );
    }
}
