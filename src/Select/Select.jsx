import styles from './Select.css';

import React from 'react';
import cx from 'classnames';
import Icon from 'react-fa';
import _ from '../util/util';

export default class Select extends React.Component {
    static defaultProps = {
        options: [],
        placeholder: 'Select...'
    };

    static propTypes = {
        options: React.PropTypes.array.isRequired,
        placeholder: React.PropTypes.string
    };

    state = {
        value: Array.isArray(this.props.defaultValue) ?
            this.props.defaultValue :
            typeof this.props.defaultValue === 'undefined' ?
            [] : [this.props.defaultValue],
        showOptions: false
    };

    handleSelect(e) {
        e.preventDefault();
        e.target.setAttribute('unselectable', 'on');

        this.setState({
            value: this.props.multiple ? [...this.state.value, e.target.innerHTML] : [e.target.innerHTML]
        });

        this.props.onChange && this.props.onChange(...arguments);
    }

    handleRemove(e) {
        e.preventDefault();
        e.target.setAttribute('unselectable', 'on');

        let span = e.target;
        while(!_.hasClass(span, styles['multiple'])) {
            span = span.parentNode;
        }

        let value = [...this.state.value];
        let index = value.indexOf(_.getTextContent(span));
        if (index > -1) {
            value.splice(index, 1);
        }

        this.setState({
            value: value,
            showOptions: value.length < this.props.options.length
        });

        this.props.onChange && this.props.onChange(...arguments);
    }

    componentDidMount() {
        let _this = this;
        this.handleClickDocument = function(e) {
            if (_this.props.disabled) {
                return;
            }

            _this.setState({
                showOptions: (_.contains(_this.refs.box, e.target) || _this.refs.box === e.target)
                                && _this.state.value.length < _this.props.options.length
                                && !_this.state.showOptions
            });
        };

        _.bind(document, 'click', this.handleClickDocument);
    }

    componentWillUnmount() {
        _.unbind(document, 'click', this.handleClickDocument);
    }

    render() {
        let { className, defaultValue, options, multiple, placeholder, disabled, ...other } = this.props;

        let boxClassNames = cx(
                styles['box'],
                className,
                {
                    [styles['disabled']]: disabled,
                    [styles['focus']]: !disabled
                }
            );

        let spans;
        if (this.state.value.length === 0) {
            spans = <span className={styles['placeholder']}>{placeholder}</span>
        } else if (multiple) {
            spans = this.state.value.map(v => (
                <span key={v} className={cx(styles['multiple'], {[styles['hover']]: !disabled})} onMouseDown={disabled ? null : ::this.handleRemove}>
                    {v}<Icon name='close' className={styles['close']} ></Icon>
                </span>));

            options = options.filter(option => !this.state.value.includes(option));
        } else {
            spans = <span>{this.state.value[0]}</span>
        }

        let lis = options.map(option => {
            let props = {
                key: option,
                className: cx(styles['option'], { [styles['selected']]: !multiple && this.state.value[0] == option }),
                onMouseDown: disabled ? null : ::this.handleSelect
            }
            return <li {...props}>{option}</li>
        });

        let arrowClassNames = cx(
                styles['arrow'],
                { [styles['filp']]: this.state.showOptions }
            );

        return (
            <div className={styles['select']}>
                <div ref="box" tabIndex="0" className={boxClassNames} {...other}>
                    {spans}
                    <i className={arrowClassNames}></i>
                </div>
                <ul className={styles['options']} style={{display: this.state.showOptions ? 'block' : 'none'}}>
                    {lis}
                </ul>
            </div>
        );
    }
}
