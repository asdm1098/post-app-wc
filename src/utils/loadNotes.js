import { db } from "../config/firebase-config";

export const loadNotes = async ( uid ) => {
    //Referencia a la db
    const postsSnap = await db.collection( `${ uid }/collection/posts` ).get();
    // const postsApiWaco = await fetch('https://waco-api.herokuapp.com/api/posts', {
    //     method: 'GET',
    //     headers:{ 'Content-Type': 'application/json' }

    // });
    

    
    // console.log('postsApiWaco: ', postsApiWaco);
    const posts = [];

    postsSnap.forEach( snapHijo => {
        //console.log(snapHijo.data());
        posts.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });

    //console.log(posts);
    return posts;
}