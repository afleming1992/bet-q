import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startGame } from './../../actions/index';

import MainLogo from '../../components/main_logo';
import Loading from '../../components/loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faClipboardList } from '@fortawesome/free-solid-svg-icons';

import './Start.css';

class Start extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            loadingMessage: null
        }

        this.onGameStart = this.onGameStart.bind(this);
    }

    onGameStart(event) {
        event.preventDefault();

        this.setState({
            loading: true,
            loadingMessage: "Creating Game..."
        });

        this.props.startGame();
    } 

    renderStartMenu() {
        return (
            <div className='start-buttons'>
                <div className="card-body">
                    <button onClick={this.onGameStart} className="btn btn-success btn-lg btn-block">
                        <FontAwesomeIcon icon={faGamepad} /> Start
                    </button>
                    <button className="btn btn-info btn-lg btn-block">
                        <FontAwesomeIcon icon={faClipboardList} /> How to Play
                    </button>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className='start-screen'>
                <div>
                    <div className="start-logo row justify-content-center">
                        <div className='col align-self-center start-screen'>
                            <MainLogo />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className='col align-self-center card'>
                            {
                                this.state.loading ? <Loading loadingMessage={this.state.loadingMessage} /> : this.renderStartMenu()
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ startGame }, dispatch);  
}

export default connect(null, mapDispatchToProps)(Start);