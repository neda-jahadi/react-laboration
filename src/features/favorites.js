import { createAction, createReducer } from '@reduxjs/toolkit';



const addMyOwnName = createAction('add my own name');
const addMyOwnBirthYear = createAction('add my own birth year');
const actions = {addMyOwnName,addMyOwnBirthYear};
const initialState =[
    {
        name:'',
        birth_year:''
    }
]
    
 
    

const reducer = createReducer(initialState, {
    [addMyOwnName]: (state, action) => 
        [...state, {name: action.payload}],

    [addMyOwnBirthYear]: (state, action) => 
        [...state, {birth_year: action.payload}]
    
         
})


export { actions, reducer };