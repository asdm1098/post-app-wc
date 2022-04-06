import { db } from '../../../config/firebase-config';
import { finishLoading, startLoading } from "./ui";
import { loadFavoritesPost, loadPosts } from "../../../utils/loadPosts";
import { types } from "../types/types";

//cargar notas, función asincrona
export const startLoadingPost = (uid) => {
    return async ( dispatch ) => {

        dispatch( startLoading());
        try {
            const posts = await loadPosts();
            const favorites = await loadFavoritesPost(uid);
            dispatch( setPots( posts.data ) );
            dispatch( updateFavoritesPosts(favorites));
        } catch (error) {
            console.log('error al traer post de Api: ', error);
        }
        dispatch(finishLoading());

    }
}

export const startDeleting = ( post ) => {
    const {idWako} = post;
    console.log('idWako: ', idWako);
    return async (dispatch, getSate ) => {
        const uid = getSate().auth.uid;

        if (idWako) {
            await fetch(`https://waco-api.herokuapp.com/api/posts/${idWako}`, {
                method: 'DELETE',headers:{'Content-Type': 'application/json'}
            })
            await db.doc(`${ uid }/posts/favorites/${ post.id  }`).delete();
            dispatch( deletePost(idWako));
            dispatch( deleteFavorite(post.id))
        }else{
            await fetch(`https://waco-api.herokuapp.com/api/posts/${post.id}`, {
                method: 'DELETE',headers:{'Content-Type': 'application/json'}
            })
            dispatch( deletePost(post.id));

        }
    }
}

export const startDeletingPost = ( id ) => {
    console.log('starttttthjoppp')
    return async ( dispatch, getState) => {
        // const uid = getState().auth.uid;
        // await db.doc(`${ uid }/posts/favorites/${ id  }`).delete();
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
    const { idWako } = post;
    return async ( dispatch ) => {
        try {

            await fetch(`https://waco-api.herokuapp.com/api/posts/${idWako ? idWako : post.id}`, {
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

        if (!idWako) {
            const postToFirestore = { ...post };
            delete postToFirestore.id;
    
            //acción que actualiza
            dispatch( refreshPost( post.id, postToFirestore ));
        }else{
            const postToFirestore = { ...post };
            delete postToFirestore.idWako;
    
            //acción que actualiza
            dispatch( refreshPost( post.idWako, postToFirestore ));
            dispatch( refreshFavorite( post.id, postToFirestore ));

        }
    }
}

export const startUpdateFavorite = ( post ) => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;

        const favoriteToFirestore = { ...post };
        delete favoriteToFirestore.id;

        await db.doc(`${ uid }/posts/favorites/${ post.id }`).update( favoriteToFirestore );

        //acción que actualiza
        dispatch( refreshFavorite( post.id, favoriteToFirestore ));
    }
}

const refreshFavorite = (id, post) => ({
    type: types.favoriteUpdated,
    payload: {
       id, 
        post: {
           id,
            ...post
        }
    }
})

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

const deleteFavorite = (id) => ({
    type: types.deleteFavorite,
    payload: id
});

export const startSaveFavorite = (post) => {

    return async ( dispatch, getState ) => {
        
        const {uid} = getState().auth;

        const favorite = {
            idWako: post.id,
            title: post.title,
            body: post.body,
        }
        console.log(favorite)

        try {
            const doc = await db.collection(`${ uid }/posts/favorites`).add( favorite ); 
            dispatch(addNewFavorite( doc.id, favorite));
        } catch (error) {
            console.log(error);
        }

    }
}
const addNewFavorite =( id, post ) => ({
    type: types.postAddFavorite,
    payload: {
        id, ...post
    }
})
//Grabar notas y posts obtenidas de firestore en nuestro store
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