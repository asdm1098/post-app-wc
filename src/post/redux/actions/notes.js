import Swal from 'sweetalert2';


import { types } from "../types/types";
import { db } from '../../../config/firebase-config';
import { loadNotes } from '../../../utils/loadNotes';
import { fileUpload } from '../../../utils/fileUpload';

//react-journal


//Tarea asíncrona, crear nueva nota
export const startNewNote = () => {
    return async ( dispatch, getState ) => {
        
        const {uid} = getState().auth;

        const newPost = {
            title: '',
            body: '',
            user_uuid: uid,
            date: new Date().getTime()
        }

        const post = {
            "title": "title",
            "body": "body",
            "user_uuid": uid,
        }
        

        try {
            const doc = await db.collection(`${ uid }/collection/posts`).add( newPost );
            
            fetch('https://waco-api.herokuapp.com/api/posts', {
                method: 'POST', 
                body: JSON.stringify(post), 
                headers:{ 'Content-Type': 'application/json' }
            })
            .then(function(response){return response.json();})
            .then(response => {
                console.log(response.data);
                const postW = {
                    idWaco: response.data.id,
                    title: response.data.title,
                    body: response.data.body,
                    link: response.data.link,
                }

                dispatch( activePost( doc.id,  postW ));
                //activar nota creada
                dispatch( addNewNote( doc.id, postW ));  
            })
            .catch((error) => {
                console.log('error: ', error);
            });


        } catch (error) {
            console.log(error);
        }

    }
}

//Activar nota creada de una vez
export const addNewNote = ( id, post ) => ({
    type: types.postsAddNew,
    payload: {
        id, ...post
    }
});

//Activar nota
export const activePost = ( id, post ) => ({
    type: types.postsActive,
    payload: {
        id,
        ...post
    }
});


//cargar notas, función asincrona
export const startLoadingNotes = ( uid ) => {
    return async ( dispatch ) => {
        
        const posts = await loadNotes( uid );
        dispatch( setNotes( posts ) );

    }
}


//Grabar notas obtenidas de firestore en nuestro store
export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes 
});


//Grabar en la base de datos los cambios de la nota activa, firestore 
//tarea asíncrona
export const startSaveNote = ( note ) => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;

        if( !note.url ){
            delete note.url;
        }

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        await db.doc(`${ uid }/collection/posts/${ note.id }`).update( noteToFirestore );

        //acción que actualiza
        dispatch( refreshNote( note.id, noteToFirestore ));
        Swal.fire('Saved', note.title, 'success');
    }
}


//Actualizar únicamente la nota que cambio en el store, la que se actualizo
export const refreshNote = ( id, note ) => ({
     type: types.notesUpdated,
     payload: {
        id, 
         note: {
            id,
             ...note
         }
     }
});

//SUBIR IMAGÉN A CLOUDFIRE USANDO EL HELPER
export const startUploading = ( file ) => {
    return async ( dispatch, getState ) => {
        
        const { active: activeNote } = getState().notes;
        
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });
        //petición asincrona del url de la imagen subida, helpers
        const fileUrl = await fileUpload( file );
        //console.log(fileUrl);

        //ACTUALIZAR URL DE LA NOTA ACTIVA
        activeNote.url = fileUrl;
        dispatch( startSaveNote( activeNote ));

        Swal.close();
    
    }
}


//BORRAR POST, asínc

export const startDeleting = ( id ) => {
    return async ( dispatch, getState ) => {

        //borrar de firestore
        const uid = getState().auth.uid;
        await db.doc(`${ uid }/collection/posts/${ id  }`).delete();

        //borrar del store
        dispatch( deleteNote(id));

    }
}

//Borrar de mi store la nota
export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})


//PURGAR LAS NOTAS AL REALIZAR LOGOUT
export const notesLogout = () => ({
    type: types.notesLogoutCleaning
})