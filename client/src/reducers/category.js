import { ACTIONS } from './../actions';

const initialState = null;

export default function(state = initialState, action) {
    switch(action.type) {
        case ACTIONS.GET_CATEGORY:
            return action.payload.data.category
        case ACTIONS.NEXT_QUESTION:
            return null;
        default:
            return state;
    }
}