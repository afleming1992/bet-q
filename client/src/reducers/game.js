import { ACTIONS } from './../actions/index';

const initialState = {
    status: "START"
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ACTIONS.START_GAME:
            return action.payload.data.game;
        case ACTIONS.GET_GAME:
            return action.payload.data.game;
        case ACTIONS.GET_CATEGORY:
            return Object.assign(state, {
                "questionNumber": action.payload.data.questionNumber
            });
        default:
            return state;
    }
}
