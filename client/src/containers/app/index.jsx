import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import GameScreen from './../../components/game-screen';
import Start from './../../containers/start';
import Loading from './../../components/loading';
import Bet from './../../containers/bet';
import Question from './../../containers/question';
import QuestionResult from './../../containers/result';
import EndScreen from './../../containers/end';


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
                return (
                    <GameScreen
                        score={this.props.score}
                        atRisk={this.props.atRisk}
                        questionNumber={this.props.questionNumber}
                        totalQuestions={this.props.totalQuestions}>
                        <QuestionResult />
                    </GameScreen>
                )
            case (LOCATION.BANKRUPT) :
                return (
                    <div>
                        <EndScreen bankrupt={true} />
                    </div>
                );
            case (LOCATION.END) :
                return (
                    <div>
                        <EndScreen bankrupt={false} />
                    </div>
                )
            default:
                return <Start />
        }
    }

    render() {
        return (
            <div id="application">
                <Helmet>
                    <title>BetQ - Place a Bet against your Wits!</title>
                </Helmet>
                <div className="row justify-content-center">
                    <div className="col-md-10 ">
                        {this.renderByLocation()}
                    </div>
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