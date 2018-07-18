import { combineReducers } from 'redux'
import gameReducer from './game';
import locationReducer from './location';
import categoryReducer from './category';
import scoreReducer from './score';
import questionReducer from './question';
 
const rootReducer = combineReducers({
    game: gameReducer,
    location: locationReducer,
    category: categoryReducer,
    score: scoreReducer,
    question: questionReducer
})

export default rootReducer;