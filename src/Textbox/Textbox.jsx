import styles from './Textbox.css';

import React from 'react';
import cx from 'classnames';
import PlaceholderShim from '../PlaceholderShim/PlaceholderShim';

export default class Textbox extends React.Component {
    static defaultProps = {
        type: 'text',
        lgStyle: 'default'
    };

    static propTypes = {
        type: React.PropTypes.oneOf(['text', 'password']),
        lgStyle: React.PropTypes.oneOf(['default', 'primary'])
    };

    render() {
        let { className, lgStyle, disabled, ...other } = this.props;

        let classNames = cx(
            styles['textbox'],
            styles[lgStyle],
            className,
            { [styles['disabled']]: disabled }
        );

        return (
            <PlaceholderShim className={classNames}
                disabled={disabled}
                {...other} />
        );
    }
}
