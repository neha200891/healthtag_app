import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducers from './reducers/userReducers';
import {loadState} from "../components/utility/localstorage"
const persistedState = loadState();
const rootReducer = combineReducers({
    root:userReducers
});

const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(applyMiddleware(thunk))
);
export default store;