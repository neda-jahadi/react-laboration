import { combineReducers } from 'redux';
import { reducer as starwarsReducer } from './starwars';
import { reducer as favoritesReducer } from './favorites';

const rootReducer = combineReducers({
    // add feature reducer here
    starwars: starwarsReducer,
    favorites: favoritesReducer
})

export { rootReducer };