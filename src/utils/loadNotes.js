import { db } from "../config/firebase-config";

export const loadNotes = async ( uid ) => {
    //Referencia a la db
    const postsSnap = await db.collection( `${ uid }/collection/posts` ).get();
  
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