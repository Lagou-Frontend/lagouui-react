import styles from './Radio.css';

import React from 'react';
import cx from 'classnames';

export default class Radio extends React.Component {
    static defaultProps = {
        checked: false
    }

    static propTyps = {
        checked: React.PropTypes.bool
    }

    render() {
        let { className, label, ...other } = this.props;
        let classNames = cx(
            styles['radio'],
            className,
            {
                [styles['checked']]: this.props.checked,
                [styles['disabled']]: this.props.disabled
            }
        );

        return (
            <label className={classNames}>
                <input className={styles['input']} {...other} type="radio" />
                <span className={styles['outer']}>
                    <span className={styles['inner']}></span>
                </span>
                {label}
            </label>
        );
    }
}
