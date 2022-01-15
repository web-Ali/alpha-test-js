import axios from "axios";

const SET_CARDS = 'SET_CARDS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_ERROR = 'SET_ERROR';
const LIKED = 'LIKED';
const DELETE_CARD = 'DELETE_CARD';


let initialState = {
    cards: [],
    isFetching: false,
    errorMsg: null
};

const CardReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CARDS: {
            return {...state, cards: action.cards}
        }
        case LIKED: {
            let cardsList = [...state.cards]
            cardsList.find(card => card.id === action.cardId).liked = !cardsList.find(card => card.id === action.cardId).liked
            return {...state, cards: cardsList}
        }
        case DELETE_CARD: {
            let cardsList = state.cards.filter(card => card.id !== action.cardId)
            return {...state, cards: cardsList}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case SET_ERROR: {
            return {...state, error: action.errorMsg}
        }

        default:
            return state;
    }
}

export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const setCards = (cards) => ({type: SET_CARDS, cards});
export const likedCard = (cardId) => ({type: LIKED, cardId});
export const deleteCard = (cardId) => ({type: DELETE_CARD, cardId});
export const setError = (errorMsg) => ({type: SET_ERROR, errorMsg});


export const fetchCards = () => {
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            const response = await axios.get('https://jsonplaceholder.typicode.com/albums/1/photos')
            dispatch(toggleIsFetching(false));
            dispatch(setCards(response.data));
        } catch (e) {
            dispatch(setError('Что-то пошло не так, попробуйте повторить запрос чуть позднее'))
            dispatch(toggleIsFetching(false));
        }

    }
}


export default CardReducer