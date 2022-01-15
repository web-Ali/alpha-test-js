import {applyMiddleware, combineReducers,  createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import CardReducer from "./cards-reducer";



let rootReducer = combineReducers({
    card: CardReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


export default store;