
/*
    {
        posts: [],
        active: null, 
        active: {
            id: 'aasdasd',
            title: '',
            body: '',
            link:'sd.com/29'
            user: 'sdds123',


            imageUrl: '',
            date: 123123
        }
    }
*/

import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = ( state = initialState, action ) => {

    switch (action.type) {
        
        case types.postsActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }

        case types.postsAddNew:
            return {
                ...state,
                notes: [ action.payload, ...state.notes ]
            }

        case types.notesLoad:
            //console.log( action.payload );
            return {
                ...state, //nuevo estado
                notes: [ ...action.payload ] //como es un arreglo lo esparcimos con el operador ...spread
            }
        
        case types.notesUpdated:
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id
                        ? action.payload.note
                        : note
                )
            }

        case types.notesDelete:
            return {
                ...state,
                active: null,
                notes: state.notes.filter( note => note.id !== action.payload )
            }
            
        case types.notesLogoutCleaning:
            return {
                ...state,
                active: null,
                notes: []
            }
    
        default:
            return state;
    }
}


