import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
    render() {
        return (
            <button className="Button" onClick={this.props.onClick} disabled={this.props.disabled}>{this.props.label}</button>
        );
    }
}

export default Button;