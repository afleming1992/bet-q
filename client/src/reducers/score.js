import { ACTIONS } from './../actions';

const MINIMUM_BET_PERCENTAGE = 0.25;

const initialState = {
    score: 0,
    atRisk: 0,
    minimumBet: 0
}

const getMinimumBet = (score) => {
    return Math.round(score * MINIMUM_BET_PERCENTAGE);
}

export default function(state = initialState, action) {
    let newState;
    
    switch(action.type) {
        case ACTIONS.START_GAME:
            const startingScore = action.payload.data.game.score;

            newState = {
                score: startingScore,
                atRisk: action.payload.data.game.atRisk,
                minimumBet: getMinimumBet(startingScore)
            }

            return newState;
        case ACTIONS.PLACE_BET:
            newState = {
                score: action.payload.data.score,
                atRisk: action.payload.data.atRisk
            }

            return newState;
        default:
            return state;
    }
}