import Swal from 'sweetalert2';
import { db } from '../../../config/firebase-config';
import { loadFavoritesPost, loadPosts } from "../../../utils/loadPosts";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";

//cargar notas, función asincrona
export const startLoadingPost = (uid) => {
    return async ( dispatch ) => {

        dispatch( startLoading());
        try {
            const posts = await loadPosts();
            const favorites = await loadFavoritesPost(uid);
            console.log(favorites);
            dispatch( setPots( posts.data ) );
            // dispatch( updateFavoritesPosts(favorites))
        } catch (error) {
            console.log('error al traer post de Api: ', error);
        }
        dispatch(finishLoading());

    }
}

export const startDeletingPost = ( id ) => {
    return async ( dispatch, getState) => {
        const uid = getState().auth.uid;
        await db.doc(`${ uid }/posts/favorites/${ id  }`).delete();
        try {
            await fetch(`https://waco-api.herokuapp.com/api/posts/${id}`, {
                method: 'DELETE',
                headers:{
                  'Content-Type': 'application/json'
                }
            }).then(resp => resp.json())
              .then((resp) => {
                  console.log('eliminado: ', resp);
                  dispatch( deletePost(id));
              })
        } catch (error) {
            console.log('error al eliminar: ', error)
        }

    }
}

export const startSavePost = ( post ) => {
    return async ( dispatch, getState ) => {
        const {uid} = getState().auth;

        try {
            await db.collection(`${ uid }/posts/favorites`).add( post );

            await fetch(`https://waco-api.herokuapp.com/api/posts/${post.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    "title": post.title,
                    "body": post.body
                }),
                headers:{
                  'Content-Type': 'application/json'
                }
            }).then(resp => resp.json())
              .then((resp) => {
                  console.log(resp)
                })
            
        } catch (error) {
            console.log('error al actualizar nota: ', error);
        }

        const postToFirestore = { ...post };
        delete postToFirestore.id;

        //acción que actualiza
        dispatch( refreshPost( post.id, postToFirestore ));
    }
}

export const refreshPost = ( id, post ) => ({
    type: types.postUpdated,
    payload: {
       id, 
        post: {
           id,
            ...post
        }
    }
});

export const deletePost = (id) => ({
    type: types.postDelete,
    payload: id
});

//Grabar notas obtenidas de firestore en nuestro store
export const setPots = ( posts ) => ({
    type: types.postsLoad,
    payload: posts 
});

export const updateFavoritesPosts = (posts) => ({
    type: types.postFavorites,
    payload: posts 
});

export const setActivePost = (post) => ({
    type: types.postActiv,
    payload: post
})