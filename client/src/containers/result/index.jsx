import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faArrowAltCircleRight, faDice, faPiggyBank, faTrophy } from '@fortawesome/free-solid-svg-icons';

import './result.css';

import { nextQuestion } from './../../actions';
import Loading from './../../components/loading';
import IconNumberBlock from './../../components/icon-number-block';

class QuestionResult extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            loadingMessage: "Did you get the question right? Let's find out..."
        };
    }

    goToNextQuestion() {
        this.setState({
            loading:true,
            loadingMessage: "Moving to Next Question"
        })

        this.props.nextQuestion(this.props.result);
    }

    getCorrectAnswer() {
        

    }

    renderResult() {
        if(this.props.result.result === 'CORRECT') {
            return (
                <div id="answer-block" className="text-center">
                    <span class="badge badge-pill badge-success">
                        <FontAwesomeIcon icon={faCheck} /> CORRECT!
                    </span>
                </div>
            );
        } else {
            return (
                <div id="answer-block" className="text-center">
                    <span class="badge badge-pill badge-danger">
                        <FontAwesomeIcon icon={faTimes} /> Wrong!
                    </span>
                    <h5>The correct answer was:</h5>
                    <span class="badge badge-pill badge-primary">
                        { this.getCorrectAnswer() }
                    </span>
                </div>
            );
        }
    }

    renderScores() {
        return (
            <div className="row">
                <div className="col">
                    <IconNumberBlock
                        icon={faDice}
                        description="You risked:"
                        figure={this.props.score.atRisk}
                        colour="#dc3545"
                    />
                </div>
                <div className="col">
                    <IconNumberBlock
                        icon={faTrophy}
                        description="You won:"
                        figure={this.props.result.winnings}
                        colour="#28a745"
                    />
                </div>
                <div className="col">
                    <IconNumberBlock
                        icon={faPiggyBank}
                        description="Your total score:"
                        figure={this.props.result.totalScore}
                        colour="#007bff"
                    />
                </div>
            </div>
        )
    }
    
    render() {
        if(this.props.result == null || this.state.loading) {
            return <Loading message={this.state.loadingMessage} />
        } else {
            return (
                <div id='question-result-screen' className="text-center">
                    <h1 id="question-number-text" className="text-center">Question {this.props.questionNumber} Result</h1>
                    <hr />
                    <h3 className='text-center'>You got the answer:</h3>
                    { this.renderResult() }
                    <hr />
                    { this.renderScores() }
                    <hr />
                    <button className="btn btn-primary btn-lg" onClick={() => { this.goToNextQuestion() }}>
                        <FontAwesomeIcon icon={faArrowAltCircleRight} /> Next Question
                    </button>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        questionNumber: state.game.questionNumber,
        score: state.score,
        question: state.question,
        result: state.result
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ nextQuestion }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionResult);