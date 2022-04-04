import { types } from "../types/types";

/*
    { El state va estar vacío cuando no este autenticado
        uid: 'asdasdasd1223', //autenticación de Firebase
        name: 'Stiven'
    }
*/

export const authReducer = (state = {}, action) => {

    //acciones
    switch ( action.type ) {
        case types.login:       
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }

        case types.logout:       
            return {}
    
        default:
            return state;
    }

}