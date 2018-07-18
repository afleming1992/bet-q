import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AllHtmlEntities } from 'html-entities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';

import { getQuestion, answerQuestion } from './../../actions';

import Loading from './../../components/loading';
import Answer from './../../components/answer';

import './question.css';

const htmlentities = new AllHtmlEntities();

class Question extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            selectedAnswer: null,
            lockedIn: false
        };

        this.props.getQuestion(this.props.game);
        this.onAnswerSelected = this.onAnswerSelected.bind(this);
        this.onLockIn = this.onLockIn.bind(this);
    }

    onAnswerSelected(answerId) {
        this.setState({
            selectedAnswer: answerId
        });
    }

    onLockIn() {
        this.setState({
            lockedIn: true
        });
    }

    renderAnswers() {
        return this.props.question.answers.map((answer) => {
            return (
                <Answer 
                    answer={answer} 
                    selectedAnswer={this.state.selectedAnswer} 
                    onAnswerSelected={this.onAnswerSelected} />
            )
        })
    }

    renderLockinButton() {
        if(this.state.selectedAnswer != null) {

            const icon = this.state.lockedIn ? faLock : faUnlock;
            const text = this.state.lockedIn ? "LOCKED IN" : "Lock-in Answer";

            return (
                <button
                    className="btn btn-block btn-danger"
                    onClick={() => { this.onLockIn() }}>
                    <FontAwesomeIcon icon={ icon } /> { text }
                </button>
            )
        } else {
            return (<p className="text-center">Select an answer above</p>);
        }
    }

    render() {
        if (this.props.question == null) {
            return <Loading message="Getting your Question..." />
        } else {
            return (
                <div id="question-screen">
                    <h1 id="question-number-text" className="text-center">Question {this.props.questionNumber}</h1>
                    <h5 id="category-text" className="text-center">{this.props.question.category}</h5>
                    <hr />
                    <h4 id="question-text" className="text-center">
                        {htmlentities.decode(this.props.question.question)}
                    </h4>
                    <div id="answers-block" className="row">
                        {
                            this.renderAnswers()
                        }
                    </div>
                    <hr />
                    <div id="lockin-block" className="row">
                        <div class="col col-md-12 text-center">
                            {
                                this.renderLockinButton()
                            }
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
        questionNumber: state.game.questionNumber,
        totalQuestions: state.game.totalQuestions,
        question: state.question,
        category: state.category,
        score: state.score
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getQuestion, answerQuestion }, dispatch);  
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);
