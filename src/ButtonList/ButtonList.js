import React, { Component } from 'react';
import Button from '../Button/Button' ;
import './ButtonList.css'

class ButtonList extends Component {

    render() {
        const alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("") ;

        const items = alphabet.map((letter, index) =>
            <Button label={letter} onClick={() => this.props.handleClick(letter)} key={"button"+index} disabled={this.props.disabled}/>
        ) ;

        return (
            <div className="ButtonList">
                    {items}
            </div>
        )
    }

}

export default ButtonList;