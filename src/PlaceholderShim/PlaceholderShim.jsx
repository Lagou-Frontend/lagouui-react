import React from 'react';

let hasPlaceHolderAttr = 'placeholder' in document.createElement('input');
let defaultStyle = { color: '#b5b5b5' };

export default class PlaceholderShim extends React.Component {
    static defaultProps = {
        elementType: 'input'
    }

    static propTypes = {
        elementType: React.PropTypes.oneOf(['input', 'textarea']),
        placeholderStyle: React.PropTypes.object
    }

    state = {
        placeholdering: !this.props.defaultValue
    }

    needShim() {
        return this.props.placeholder && !hasPlaceHolderAttr;
    }

    handleFocus(...args) {
        if (this.state.placeholdering) {
            this.setState({ placeholdering: false });
        }
        this.props.onFocus && this.props.onFocus(...args);
    }

    handleBlur(...args) {
        if (this.refs.input.value === '') {
            this.setState({ placeholdering: true });
        }
        this.props.onBlur && this.props.onBlur(...args);
    }

    handleClickPlaceHolder() {
        this.refs.input.focus();
    }

    componentDidMount() {
        if (!this.needShim()) {
            return;
        }

        let input = this.refs.input;
        let placeholder = this.refs.placeholder;
        let inputStyle = input.currentStyle;
        if (!inputStyle) {
            return;
        }

        let tempStyle = {
            top: (parseInt(inputStyle.marginTop) || 0) +
                 (parseInt(inputStyle.paddingTop) || 0) +
                 (parseInt(inputStyle.borderTopWidth) || 0) + 'px',
            left: (parseInt(inputStyle.marginLeft) || 0) +
                  (parseInt(inputStyle.paddingLeft) || 0) +
                  (parseInt(inputStyle.borderLeftWidth) || 0) + 'px',
            fontFamily: inputStyle.fontFamily,
            fontWeight: inputStyle.fontWeight,
            fontVariant: inputStyle.fontVariant,
            fontSize: inputStyle.fontSize,
            fontStyle: inputStyle.fontStyle,
            lineHeight: inputStyle.lineHeight,
            color: inputStyle.color
        }

        let customStyle = defaultStyle;
        if (typeof this.props.placeholderStyle === 'object') {
            Object.assign(customStyle, this.props.placeholderStyle);
        }
        Object.assign(
            tempStyle,
            customStyle
        );
        if (this.props.disabled) {
            tempStyle.color = '#fff';
            tempStyle.cursor = 'default'
        }

        Object.assign(
            placeholder.style,
            tempStyle
        );
    }

    render() {
        let { elementType, ...other } = this.props;
        if (!this.needShim()) {
            return React.createElement(elementType, other);
        }

        let disabled = this.props.disabled;
        let wrapperStyle = {
            position: 'relative',
            display: 'inline-block'
        };
        let placeholderStyle = {
            position: 'absolute',
            display: this.state.placeholdering ? 'block' : 'none'
        };

        return (
            React.createElement('div', { style: wrapperStyle },
                React.createElement(elementType, {
                    ref: 'input',
                    ...other,
                    onFocus: disabled ? null : ::this.handleFocus,
                    onBlur: disabled ? null : ::this.handleBlur
                }),
                React.createElement('span', {
                    style: placeholderStyle,
                    ref: 'placeholder',
                    onClick: disabled ? null : ::this.handleClickPlaceHolder
                }, this.props.placeholder)
            )
        );
    }
}
