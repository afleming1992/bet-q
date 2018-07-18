import React, { Component } from 'react';

import { connect } from 'react-redux'

import Start from './../../containers/start';
import Loading from './../../components/loading';
import Bet from './../../containers/bet';
import Question from './../../containers/question';
import GameScreen from './../../components/game-screen';

import * as LOCATION from './../../types/location';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            loadingMessage: null
        };
    }

    renderByLocation(){
        if(this.props.game === undefined) {
            return <Loading message="Starting up..." />
        }

        switch(this.props.location) {
            case (LOCATION.PLACE_BET) :
                return (
                    <GameScreen
                        score={this.props.score}
                        atRisk={this.props.atRisk}
                        questionNumber={this.props.questionNumber}
                        totalQuestions={this.props.totalQuestions}>
                        <Bet />
                    </GameScreen>
                );
            case (LOCATION.QUESTION) :
                return (
                    <GameScreen
                        score={this.props.score}
                        atRisk={this.props.atRisk}
                        questionNumber={this.props.questionNumber}
                        totalQuestions={this.props.totalQuestions}>
                        <Question />
                    </GameScreen>
                );
            case (LOCATION.ANSWERED) :

                break;
            case (LOCATION.BANKRUPT) :

                break;
            case (LOCATION.END) :

                break;
            default:
                return <Start />
        }
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-md-10 ">
                    {this.renderByLocation()}
                </div>
            </div>
            
        )
    }
}

function mapStateToProps(state){
    return {
        game: state.game,
        location: state.location,
        score: state.score,
        questionNumber: state.game.questionNumber,
        totalQuestions: state.game.totalQuestions,
    }
}

export default connect(mapStateToProps, null)(App);