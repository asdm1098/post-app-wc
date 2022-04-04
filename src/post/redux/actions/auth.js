import Swal from 'sweetalert2';
import { firebase, googleAuthProvider } from '../../../config/firebase-config';


//accion que voy a llamar cuando tenga el uid y el displayname
import { types } from "../types/types"
import { notesLogout } from './notes';
import { finishLoading, startLoading } from './ui';


//acción asíncrona -- petición - login 
export const startLoginEmailPassword = ( email, password ) => {
    return ( dispatch ) => {

        dispatch(startLoading());

        return firebase.auth().signInWithEmailAndPassword( email, password )
        .then( ({ user }  ) => {
            dispatch( login( user.uid, user.displayName ));

            dispatch(finishLoading());

        }).catch( e => {
            console.log(e);
            dispatch(finishLoading());
            Swal.fire('Error', e.message, 'error');
        });
    }
}

//Acción asincrona google - Logearse con Google
export const startGoogleLogin = () => {
    return ( dispatch ) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {
                dispatch(
                    login( user.uid, user.displayName )
                )
            });

    }
}

//Acción de crear usuario con Email y contraseña
//es una tarea asincrona por lo cual retorno un callBack
export const startRegisterWithEmailPasswordName = ( email, password, name) => {
    return ( dispatch ) => {

        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async({ user }) => {
                //asignar displayName
                await user.updateProfile({ displayName: name });

                dispatch(
                    login( user.uid, user.displayName )
                )
            }).catch( e => {
                console.log(e);
                Swal.fire('Error', e.message, 'error');
            });
    }
}


//acción que tiene que regresar LOGIN 
export const login = ( uid, displayName ) => ({
        type: types.login,
        payload: {
            uid,
            displayName
        }
})

//Logout
//asincrona
export const startLogout = () => {
    return async( dispatch ) => {
        await firebase.auth().signOut();

        dispatch( logout() );
        dispatch( notesLogout() );
    }
}

export const logout = () => ({   //return como un objeto 
    type: types.logout
})

