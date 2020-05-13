import { createAction, createReducer } from '@reduxjs/toolkit';



const addToFavorite = createAction('add to favorite');
const removeFromFavorite = createAction('remove from favorite');

const actions = {addToFavorite,removeFromFavorite};
const initialState =[]

    
 
    

const reducer = createReducer(initialState, {
    [addToFavorite]: (state, action) =>  [...state, action.payload],
    [removeFromFavorite]: (state, action) => 
		state.filter(p => p.name !== action.payload.name)

   
    
         
})


export { actions, reducer };

