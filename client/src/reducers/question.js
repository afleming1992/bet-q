import { ACTIONS } from './../actions';

const initialState = null;

export default function(state = initialState, action) {
    switch(action.type) {
        case ACTIONS.GET_QUESTION:
            return action.payload.data;
        case ACTIONS.NEXT_QUESTION:
            return null;
        default:
            return state;
    }
}