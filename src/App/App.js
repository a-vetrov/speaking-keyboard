import React, { Component } from 'react';
import bg from './bg.svg';
import './App.css';
import ButtonList from '../ButtonList/ButtonList' ;
import LetterPlate from '../LetterPlate/LetterPlate' ;
import Word from '../Word/Word' ;
import $ from 'jquery' ;
import LetterSound from '../LetterSound'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            letter: null,
            configLoaded: false,
            letterSound:null,
            wordSound:null,
            word:null,
            pictureUrl:null,
            letterAppeared:false,
            previousWord:null,
            uid:0
        } ;
        this.loadInitXML() ;
    }

    $initXML = null ;

    loadInitXML = () => {
        /*fetch("init.xml").then(response => response.text()).then(xmlString => {
            this.$initXML = $((new DOMParser()).parseFromString(xmlString, "text/xml")) ;
            this.setState({configLoaded: true});
        }) ;*/

        $.get( "init.xml", (xml) => {
            this.$initXML = $(xml) ;
            this.setState({configLoaded: true});
        }).fail(function() {
            console.log("init.xml loading error") ;
        }) ;

    } ;

    handleClick = letter => {
        let $letterNode = this.$initXML.find('letter[value=' + letter +']') ;
        let $items = $letterNode.find("item") ;
        let $item ;
        if ($items.length > 1) {
            do {
                $item = $($items[this.randRange(0,$items.length-1)]) ;
            } while ($item.attr('word') === this.state.word)
        } else {
            $item = $($items[0]) ;
        }
        let previousWord = this.state.word ? {word:this.state.word, wordSound:this.state.wordSound,
                                                pictureUrl:this.state.pictureUrl} : null ;

        this.setState({ letter:letter,
                        letterSound:$letterNode.attr('mp3'),
                        word:$item.attr('word'),
                        wordSound:$item.attr('mp3'),
                        pictureUrl:$item.attr('img'),
                        letterAppeared:false,
                        previousWord:previousWord,
                        uid:this.state.uid+1
                        }) ;
    } ;

    getUID = () => "uid"+this.state.uid ;

    randRange = (r1,r2) => Math.round(r1 + Math.random() * (r2 - r1)) ;


    handleLetterFinishedPlaying = () => {
        this.setState({letterAppeared:true}) ;
    } ;

    handlePreviousAnimationFinish = () => {
        this.setState({previousWord:null})
    } ;

    render() {
        const key = this.getUID() ;
        const letterPlateItem = this.state.letter ? <LetterPlate letter={this.state.letter} key={"plate"+key}/> : null ;
        const letterSoundItem = this.state.letter ? <LetterSound letterSound={this.state.letterSound}
                                                                 handler={this.handleLetterFinishedPlaying}
                                                                 key={"letterSound" +key}/> : null ;
        const wordStatus = this.state.letterAppeared ? "appear" : "invisible" ;
        const wordItem = this.state.wordSound ? <Word pictureUrl={this.state.pictureUrl}
                                                      wordSound={this.state.wordSound}
                                                      word={this.state.word} status={wordStatus}/> : null ;

        const prevWordItem = this.state.previousWord ? <Word pictureUrl={this.state.previousWord.pictureUrl}
                                                             wordSound={this.state.previousWord.wordSound}
                                                             word={this.state.previousWord.word} status="disappear"
                                                             handleAnimationFinish={this.handlePreviousAnimationFinish}/> : null ;
        return (
            <div className="App">
                <img src={bg} className="App-bg" alt=""/>
                <ButtonList handleClick={this.handleClick} disabled={!this.state.configLoaded}/>
                {letterPlateItem}
                {letterSoundItem}
                {prevWordItem}
                {wordItem}
            </div>
        );
    }
}

export default App;
