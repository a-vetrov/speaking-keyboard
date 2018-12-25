import { PureComponent } from 'react';
import {Howl} from 'howler';

class LetterSound extends PureComponent {

    sound1 = null ;
    sound2 = null ;

    sound1Loaded = false;
    sound2Loaded = false;

    soundsReady = () => this.sound1Loaded && this.sound2Loaded ;


    handlerSound1Loaded = () => {
        this.sound1Loaded = true ;
        if (this.soundsReady())
            this.sound1.play() ;
    } ;

    handlerSound2Loaded = () => {
        this.sound2Loaded = true ;
        if (this.soundsReady())
            this.sound1.play() ;
    } ;

    handleSound1FinishedPlaying = () => {
        this.sound2.play() ;
    } ;

    render() {
        this.stopCurrentSound() ;
        if (!this.sound1) {
            this.sound1 = new Howl({
                src: ['mp3/words/letter.mp3'],
                onload:this.handlerSound1Loaded,
                onend: this.handleSound1FinishedPlaying
            });
        }

        this.sound2Loaded = false ;
        this.sound2 = new Howl({
            src: [this.props.letterSound],
            onload:this.handlerSound2Loaded,
            onend: this.props.handler
        });

        return (
            null
        );
    }

    stopCurrentSound = () => {
        if (this.sound1)
            this.sound1.stop() ;
        if (this.sound2)
            this.sound2.stop() ;
    } ;

    componentWillUnmount = () => {
       this.stopCurrentSound() ;
    } ;

}

export default LetterSound;
