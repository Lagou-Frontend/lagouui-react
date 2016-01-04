import styles from './Button.css';

import React from 'react';
import cx from 'classnames';

export default class Button extends React.Component {
    static defaultProps = {
        lgSize: 'nl',
        lgStyle: 'default'
    }

    static propTypes = {
        lgSize: React.PropTypes.oneOf(['lg', 'nl', 'sm']),
        lgStyle: React.PropTypes.oneOf(['default', 'primary', 'link'])
    }

    render() {
        let { className, lgSize, lgStyle, disabled, block, ...other } = this.props;

        let classNames = cx(
            styles['btn'],
            styles[lgSize],
            styles[lgStyle],
            className,
            {
                [styles['disabled']]: disabled,
                [styles['block']]: block
            }
        );

        return <button className={classNames} disabled={disabled} {...other}>{this.props.children}</button>;
    }
};
