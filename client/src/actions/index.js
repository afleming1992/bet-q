import axios from 'axios';

const ROOT_URL = 'https://betq-staging-api.herokuapp.com/api/v1';

export const ACTIONS = {
    START_GAME : 'START_GAME',
    GET_GAME : 'GET_GAME',
    GET_CATEGORY : 'GET_CATEGORY',
    PLACE_BET : 'PLACE_BET',
    GET_QUESTION : 'GET_QUESTION',
    ANSWER_QUESTION : 'ANSWER_QUESTION',
    NEXT_QUESTION : 'NEXT_QUESTION'
}


export const startGame = () => {
    const url = `${ROOT_URL}/game`;

    const request = axios.post(url, {

    });

    return {
        type: ACTIONS.START_GAME,
        payload: request
    }
}

export const getGame = (id) => {
    const url = `${ROOT_URL}/game/${id}`;

    const request = axios.get(url, {
        url
    });

    return {
        type: ACTIONS.GET_GAME,
        payload: request
    }
}

export const getCategory = (game) => {
    const url = `${ROOT_URL}/game/${game.id}/category`

    const request = axios.get(url);

    return {
        type: ACTIONS.GET_CATEGORY,
        payload: request
    }
}

export const getQuestion = (game) => {
    const url = `${ROOT_URL}/game/${game.id}/question`

    const request = axios.get(url);

    return {
        type: ACTIONS.GET_QUESTION,
        payload: request
    }
}

export const placeBet = (game, amount) => {
    const url = `${ROOT_URL}/game/${game.id}/bet`

    const request = axios({
        method: 'post',
        url: url,
        data: {
            bet: amount
        }
    });

    return {
        type: ACTIONS.PLACE_BET,
        payload: request
    }
}

export const answerQuestion = (game, selectedAnswer) => {
    const url = `${ROOT_URL}/game/${game.id}/answer`

    const request = axios({
        method: 'post',
        url: url,
        data: {
            "answer": selectedAnswer
        }
    });

    return {
        type: ACTIONS.ANSWER_QUESTION,
        payload: request
    }
}