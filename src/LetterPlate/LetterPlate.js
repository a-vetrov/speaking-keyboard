import React, { Component } from 'react';
import './LetterPlate.css'

class LetterPlate extends Component {

    render() {

        return (
            <div className="LetterPlate">
                <div className="LetterPlate-letter">{this.props.letter}</div>
            </div>
        )
    }

}

export default LetterPlate;
