import { combineReducers } from 'redux'
import gameReducer from './game';
import locationReducer from './location';
import categoryReducer from './category';
import scoreReducer from './score';
import questionReducer from './question';
import resultReducer from './result';
 
const rootReducer = combineReducers({
    game: gameReducer,
    location: locationReducer,
    category: categoryReducer,
    score: scoreReducer,
    question: questionReducer,
    result: resultReducer
})

export default rootReducer;