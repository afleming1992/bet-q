import React from 'react';

import ScoreBar from './../score-bar';

import './game-screen.css';
const GameScreen = (props) => {
    return (
        <div className='game-container'>
            <ScoreBar
                score={props.score}
                atRisk={props.atRisk}
                questionNumber={props.questionNumber}
                totalQuestions={props.totalQuestions}  />
            <div className="game-screen card">
                <div className="card-body">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default GameScreen;