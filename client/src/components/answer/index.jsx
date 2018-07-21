import React, { Component } from 'react';

import { AllHtmlEntities } from 'html-entities';

import './answer.css';

const htmlentities = new AllHtmlEntities();

export default class Answer extends Component {

    onAnswerSelect(event) {
        if(!this.props.lockedIn) {
            this.props.onAnswerSelected(this.props.answer.id);
        }
    }

    render() {
        let buttonStyling = "btn btn-block btn-outline btn-lg";
        if(this.props.selectedAnswer === this.props.answer.id) {
            buttonStyling = buttonStyling + " btn-warning";
        }

        return (
            <div className="answer col col-md-6 col-sm-12">
                <button 
                    className={buttonStyling}
                    onClick={(event) => { this.onAnswerSelect(event) }}>
                    { htmlentities.decode(this.props.answer.text) }
                </button>
            </div>
           
        );
    }
}