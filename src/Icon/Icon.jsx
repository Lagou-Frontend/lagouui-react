import 'font-awesome/css/font-awesome.css';

import React from 'react';
import cx from 'classnames';

export default class Icon extends React.Component {

    static defaultProps = {
        Component: 'span',
    };

    static propTypes = {
        name: React.PropTypes.string.isRequired,
        className: React.PropTypes.string,
        size: React.PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x']),
        rotate: React.PropTypes.oneOf(['45', '90', '135', '180', '225', '270', '315']),
        flip: React.PropTypes.oneOf(['horizontal', 'vertical']),
        fixedWidth: React.PropTypes.bool,
        spin: React.PropTypes.bool,
        pulse: React.PropTypes.bool,
        stack: React.PropTypes.oneOf(['1x', '2x']),
        inverse: React.PropTypes.bool,
        Component: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.func])
    };

    render() {
        let {
            Component,
            className,
            name,
            size,
            rotate,
            flip,
            spin,
            fixedWidth,
            stack,
            inverse,
            pulse,
            ...other
        } = this.props;

        cx(
            'fa',
            `fa-${name}`,
            {
                [`fa-${size}`]: size,
                [`fa-rotate-${rotate}`]: rotate,
                [`fa-flip-${flip}`]: flip,
                [`fa-fw`]: fixedWidth,
                [`fa-spin`]: spin,
                [`fa-pulse`]: pulse,
                [`fa-stack-${stack}`]: stack,
                [`fa-inverse`]: inverse
            },
            className
        );

        return <Component className = {classNames} {...other} />;
    }
}
