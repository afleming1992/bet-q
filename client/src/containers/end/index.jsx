import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { startGame } from './../../actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndoAlt } from '@fortawesome/free-solid-svg-icons';

import './end.css';
class EndScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            loadingMessage: null
        }

        this.onGameStart = this.onGameStart.bind(this);
    }

    onGameStart() {
        this.setState({
            loading: true,
            loadingMessage: "Creating a new game..."
        });

        this.props.startGame();
    }

    renderBankrupt() {
        return (
            <div className="game-end-screen row justify-content-center">
                <div className="col-md-6">
                    <div className="end-game-state-heading text-center">
                        Bankrupt!
                    </div>
                    <div className="card">
                        <div className="card-body text-center">
                            <h4>You've run out of money!</h4>
                            <hr />
                            <button 
                                className="btn btn-success btn-lg"
                                onClick={() => { this.onGameStart() }}>
                                <FontAwesomeIcon icon={faUndoAlt} /> Play again?
                            </button>
                        </div>
                    </div>
                </div>
            </div>
                
        )
    }

    renderEndOfGame() {
        return (
            <div id="game-end-screen">
                <div className="end-game-state-heading text-center">
                    Congrats!
                </div>
                <div className="card">
                    <div className="card-body text-center">
                        <h4>You scored:</h4>

                        <button className="btn btn-success">Play New Game</button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        if(this.props.bankrupt) {
            return this.renderBankrupt();
        } else {
            return this.renderEndOfGame();
        }
    }

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ startGame }, dispatch);  
}

export default connect(null, mapDispatchToProps)(EndScreen);