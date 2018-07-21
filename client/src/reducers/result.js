import { ACTIONS } from './../actions';

const initialState = null;

export default (state = initialState, action) => {
    switch (action.type) {
        case (ACTIONS.ANSWER_QUESTION) :
            return action.payload.data;
        case (ACTIONS.NEXT_QUESTION) :
            return {};
        default:
            return state;
    }
}