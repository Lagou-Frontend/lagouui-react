'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Textbox, Textarea, Checkbox, RadioGroup, Radio, Select } from '../src/LGUIReact';

let handleClick= function() {
    alert('clicked');
}

let handleChange = function(e) {
    console.log(e);
}

let options = [ '11111', '22222', '33333', '44444', '55555' ];

ReactDOM.render(
    <div className="container">
        <div className="row">
            <Button onClick={handleClick}>Default</Button>
            <Button disabled onClick={handleClick}>Disabled</Button>
        </div>
        <div className="row">
            <Button lgStyle="primary" onClick={handleClick}>Primary</Button>
            <Button lgStyle="primary" disabled onClick={handleClick}>Disabled</Button>

        </div>
        <div className="row">
            <Button lgStyle="link" onClick={handleClick}>Link</Button>
            <Button lgStyle="link" disabled onClick={handleClick}>Disabled</Button>
        </div>
        <div className="row">
            <Button lgSize="sm">Small</Button>
            <Button>Normal</Button>
            <Button lgSize="lg">Large</Button>
        </div>
        <div className="row">
            <Button lgStyle="primary" block>Block</Button>
        </div>
        <div className="row">
            <Textbox placeholder="Default"></Textbox>
            <Textbox placeholder="Primry" lgStyle="primary"></Textbox>
            <Textbox placeholder="Disabled" disabled></Textbox>
        </div>
        <div className="row">
            <Textarea placeholder="Default"></Textarea>
            <Textarea placeholder="Primry" lgStyle="primary"></Textarea>
            <Textarea placeholder="Disabled" lgStyle="primary" disabled></Textarea>
        </div>
        <div className="row">
            <Textarea placeholder="Auto size" autoSize defaultValue="Auto size"></Textarea>
        </div>
        <div className="row">
            <Checkbox label="Unchecked"></Checkbox>
            <Checkbox label="Checked" defautlChecked></Checkbox>
            <Checkbox label="Disabled" disabled></Checkbox>
            <Checkbox label="Disabled" disabled defautlChecked></Checkbox>
        </div>
        <div className="row radios">
            <RadioGroup name="sex" defaultValue="male">
                <Radio value="male" label="Male"></Radio>
                <Radio value="female" label="Female"></Radio>
            </RadioGroup>
            <RadioGroup name="sex" defaultValue="male">
                <Radio value="male" label="Male" disabled></Radio>
                <Radio value="female" label="Female" disabled></Radio>
            </RadioGroup>
        </div>
        <div className="row">
            <Select options={options} onChange={handleChange}></Select>
            <Select defaultValue="Disabled" options={options} onChange={handleChange} disabled></Select>
        </div>
        <div className="row">
            <Select options={options} onChange={handleChange} multiple></Select>
            <Select defaultValue={["11111"]} options={options} onChange={handleChange} multiple disabled></Select>
        </div>
    </div>,
    document.getElementById('example')
);
