import { db } from "../config/firebase-config";


export const loadPosts = async() => {

    const resp = await fetch('https://waco-api.herokuapp.com/api/posts')
            .then(resp => resp.json())
            .then(data => {
                return data;
            })
            .catch((error) => {
                console.log(error)
            });
    
    const { data, links } = resp;
    
    return {
        data,
        links
    };
}

export const loadFavoritesPost = async(uid) => {
    const postsSnap = await db.collection( `${ uid }/posts/favorites` ).get();
  
    const favorites = [];

    postsSnap.forEach( snapHijo => {
        //console.log(snapHijo.data());
        favorites.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });

    //console.log(favorites);
    return favorites;
}