import React, { Component } from 'react';
import './Word.css';
import {Howl} from 'howler';
import $ from 'jquery';

class Word extends Component {

    sound = null ;

    ref = React.createRef();

    render() {

        this.stopCurrentSound() ;

        if (this.props.status === "appear") {
            this.sound = new Howl({
                src: [this.props.wordSound],
                onend: this.props.handler,
                autoplay: true
            });
        }

        return (
            <div className={"word word_" + this.props.status} onAnimationEnd={this.props.handleAnimationFinish} >
                <img className="word-image" src={this.props.pictureUrl} alt={this.props.word} ref={this.ref} onLoad={this.onImageLoad}/>
                <p className="word-caption">{this.props.word}</p>

            </div>
        );
    } ;

    stopCurrentSound = () => {
        if (this.sound)
            this.sound.stop() ;
    } ;

    componentWillUnmount = () => {
        this.stopCurrentSound() ;
    } ;

    onImageLoad = () => {
        let $img = $(this.ref.current) ;
        // Check for IE
        if ($img.css('object-fit') === undefined) {
            const w = $img[0].naturalWidth ;
            const h = $img[0].naturalHeight ;
            const maxWidth = 280 ;
            const maxHeight = 370 ;

            if (w/h >= maxWidth/maxHeight) {
                $img.width(maxWidth) ;
                $img.height(h*maxWidth/w) ;
                let dh = maxHeight - $img.height() ;
                $img.css("margin",(10+dh/2)+"px 0 "+(dh/2)+"px 0") ;
            } else  {
                $img.height(maxHeight) ;
                $img.width(w*maxHeight/h) ;
                let dw = maxWidth - $img.width() ;
                $img.css("margin","0 " + (dw/2)+"px 0 " +(10+dw/2)+"px") ;
            }
        }
    } ;

}

export default Word;