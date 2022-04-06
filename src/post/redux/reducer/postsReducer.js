import { types } from "../types/types";

const initialState = {
    posts: [],
    active: null,
    favorites: []
}

export const postsReducer = ( state = initialState, action ) => {

  switch ( action.type ) {

    case types.postsLoad:
        return {
            ...state,
            posts: [ ...action.payload ]
        }
          
    case types.postFavorites:
        return {
            ...state,
            favorites: [ ...action.payload ]
        }

    case types.postActiv:
        return {
            ...state,
            active: {
                ...action.payload
            }
        }

    case types.postUpdated:
        return {
            ...state,
            posts: state.posts.map(
                post => post.id === action.payload.id
                    ? action.payload.post
                    : post
            ),
            favorites: state.favorites.map(
                fav => fav.id === action.payload.id
                    ? action.payload.post
                    : fav
            )
        }

    case types.postDelete:
        return {
            ...state,
            active: null,
            posts: state.posts.filter( post => post.id !== action.payload ),
            favorites: state.favorites.filter( fav => fav.id !== action.payload )
        }
    default:
        return state;
  }

}
