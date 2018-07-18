import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InputRange from 'react-input-range';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDoubleRight, faAngleDoubleLeft, faAngleLeft } from '@fortawesome/free-solid-svg-icons';


import Loading from './../../components/loading';

import { getCategory, placeBet } from './../../actions';

import './bet.css';
import 'react-input-range/lib/css/index.css';

class Bet extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            loading: false,
            loadingMessage: "Loading...",
            bet: this.props.score.minimumBet
        }

        this.props.getCategory(this.props.game);

        this.updateBet = this.updateBet.bind(this);
        this.placeBet = this.placeBet.bind(this);
    }

    updateBet(amount) {
        let updatedBet = this.state.bet + amount;

        if(updatedBet > this.props.score.score) {
            updatedBet = this.props.score.score;
        } else if (updatedBet < this.props.score.minimumBet) {
            updatedBet = this.props.score.minimumBet;
        }

        this.setState({
            bet: updatedBet
        });
    }

    placeBet() {
        this.setState({
            loading: true,
            loadingMessage: `Placing your Bet of ${this.state.bet} ...`
        });

        this.props.placeBet(this.props.game, this.state.bet);
    }
    
    renderForm() {
        return (
            <div>
                <h1 className="text-center">Question {this.props.questionNumber}</h1>
                <div className="category-dialog text-center">
                    <h3>Your category for this question is:</h3>
                    <h1 className="category-name badge badge-pill badge-primary">{this.props.category}</h1>
                </div>
                <hr />
                <div className="bet-selector text-center">
                    <h3>How much would you like to bet?</h3>
                    <div id="bet-slider">
                        <InputRange
                            maxValue={this.props.score.score}
                            minValue={this.props.score.minimumBet}
                            value={this.state.bet}
                            step={10}
                            onChange={bet => this.setState({ bet })} />
                    </div>
                    <div>
                        <h4>{this.state.bet}</h4>
                    </div>
                    <div id="bet-increment-buttons">
                        <button className="btn" onClick={() => this.updateBet(-100)}>
                            <FontAwesomeIcon icon={faAngleDoubleLeft} />
                        </button>
                        <button className="btn" onClick={() => this.updateBet(-10)}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                        <button className="btn" onClick={() => this.updateBet(10)}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                        <button className="btn" onClick={() => this.updateBet(100)}>
                            <FontAwesomeIcon icon={faAngleDoubleRight} />
                        </button>
                    </div>
                </div>
                <div id="bet-confirm">
                    <button className="btn btn-danger btn-lg btn-block" onClick={() => { this.placeBet() }}>
                        Place Bet
                    </button>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="bet-screen">
                {
                    this.props.category == null || this.state.loading ? <Loading message={this.state.loadingMessage} /> : this.renderForm()
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getCategory, placeBet }, dispatch);  
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
        questionNumber: state.game.questionNumber,
        totalQuestions: state.game.totalQuestions,
        category: state.category,
        score: state.score
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bet)