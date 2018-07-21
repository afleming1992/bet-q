import * as LOCATION from './../types/location.js'
import { ACTIONS } from './../actions';

const initialState = {
    location: ACTIONS.START_GAME
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ACTIONS.START_GAME:
            return LOCATION.PLACE_BET;
        case ACTIONS.PLACE_BET:
            return LOCATION.QUESTION;
        case ACTIONS.ANSWER_QUESTION:
            return LOCATION.ANSWERED;
        case ACTIONS.NEXT_QUESTION:
            if(action.payload.isGameOver) {
                if(action.payload.totalScore == 0) {
                    return LOCATION.BANKRUPT
                } else {
                    return LOCATION.END;
                }
            } else {
                return LOCATION.PLACE_BET;
            }
        default:
            return state;
    }
}