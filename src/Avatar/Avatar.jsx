import React from 'react';
import cx from 'classnames';

export default class Avatar extends React.Component {
    static defaultProps = {
        color: '#00b38a',
        size: 50
    };

    static propTypes = {
        color: React.PropTypes.string,
        size: React.PropTypes.number,
        text: React.PropTypes.string
    };

    render() {
        let { src, style, color, size, text, ...other } = this.props;
        if (src) {
            style = {
                width: size + 'px',
                height: size + 'px',
                borderRadius: size + 'px',
                ...style
            }
            return <img src={src} style={style} width={size} height={size} {...other} />
        }
        style = {
            display: 'inline-block',
            width: size - 2 + 'px',
            height: size - 2 + 'px',
            color: color,
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: color,
            borderRadius: size + 'px',
            textAlign: 'center',
            lineHeight: size + 'px',
            fontSize: Math.round(20 * size / 50 ) + 'px',
            ...style
        }
        return <i style={style} {...other}>{text}</i>;
    }
}
