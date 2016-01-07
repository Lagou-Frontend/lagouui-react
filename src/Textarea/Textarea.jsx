import styles from './Textarea.css';

import React from 'react';
import cx from 'classnames';
import _ from '../util/util';
import PlaceholderShim from '../PlaceholderShim/PlaceholderShim';
import calculateNodeHeight from './calculateNodeHeight';

export default class Textarea extends React.Component {
    static defaultProps = {
        lgStyle: 'default'
    };

    static propTypes = {
        minRows: React.PropTypes.number,
        maxRows: React.PropTypes.number,
        lgStyle: React.PropTypes.oneOf(['default', 'primary'])
    };

    state = {
        height: null,
        maxHeight: null
    };

    autoSize(e) {
        let minRows = this.props.minRows || this.props.rows || 2;
        let maxRows = this.props.minRows;
        let { height, maxHeight } = calculateNodeHeight(e.target, false, minRows, maxRows);
        this.setState({ height, maxHeight });
    }

    render() {
        let { className, lgStyle, autoSize, disabled, ...other } = this.props;

        let classNames = cx(
            styles['textarea'],
            styles[lgStyle],
            className,
            { [styles['disabled']]: disabled }
        );
        if (autoSize) {
            other.onChange = (...args) => {
                this.autoSize(...args);
                this.props.onChange && ::this.props.onChange(...args);
            };
            if (this.state.height) {
                if(!other.style) {
                    other.style = {};
                }

                if (this.state.height >= this.state.maxHeight) {
                    other.style.height = this.state.maxHeight + 'px';
                    other.style.overflowY = 'scroll';
                } else {
                    other.style.height = this.state.height + 'px';
                    other.style.overflowY = 'hidden';
                }
            }
        }

        return (
            <PlaceholderShim elementType="textarea"
                className={classNames}
                disabled={disabled}
                {...other} />
        );
    }
}
