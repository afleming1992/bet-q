import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank, faDice } from '@fortawesome/free-solid-svg-icons';

import './score-bar.css';

const ScoreBar = (props) => {
    return (
        <div id="scoreBar" className="row">
            <div className="col text-center">
                <span className='badge badge-pill badge-primary'>
                    <FontAwesomeIcon icon={faPiggyBank} /> £{props.score.score}
                </span>
            </div>
            <div className="col text-center">
                <span className='badge badge-pill badge-dark'>
                    Q {props.questionNumber} / {props.totalQuestions}
                </span>
            </div>
            <div className="col text-center">
                <span className='badge badge-pill badge-danger'>
                    <FontAwesomeIcon icon={faDice} /> £{props.score.atRisk}
                </span>
            </div>
        </div>
    )
}

export default ScoreBar;