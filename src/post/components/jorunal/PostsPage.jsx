import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import { deleteFavFire, startSaveFavorite, updateFavoritesPosts } from '../../redux/actions/posts';
import { PostCard } from './PostCard';
import { ModalEdit } from './Modal';

import './styles.css';

export const PostsPage = () => {
    
    const dispatch = useDispatch();
    const { location } = useHistory();
    const [openModal, setOpenModal] = useState(false);
    const { posts, favorites  } = useSelector(state => state.posts);
  
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const updateFavoritePost = (post) => {
        const { idWako } = post;
        
        const updated = [...favorites];
        if (!idWako) {
            const isFavorite = updated.findIndex( p => p.idWako === post.id);
             if (isFavorite >= 0) {
                let fav = updated[isFavorite];
                dispatch(deleteFavFire(fav.id))
    
            } else {
                dispatch(startSaveFavorite(post));
            }
        }else{
            const isFavorite = updated.findIndex( p => p.idWako === idWako);
            if (isFavorite >= 0) {
               let fav = updated[isFavorite];
               dispatch(deleteFavFire(fav.id))
   
           } else {
               dispatch(startSaveFavorite(post));
           }
        }
    }

  return (
    <>
        { (openModal)&& 
           <ModalEdit open={openModal} handleOpen={handleOpen} handleClose={handleClose} />
        }
        <CssBaseline />
        <div className="post-grid"> 
            {
                (location.pathname.includes('posts')) ?
                    posts.map( (post, idx) => {
                        return(
                            <PostCard 
                                post={post} 
                                key={post?.id} 
                                idx={idx} 
                                favoritos={favorites}
                                updateFavoritePost={updateFavoritePost}
                                handleOpen={handleOpen}
                            />
                        )
                    })
                    : 
                    favorites.map( (post, idx) => {
                        return(
                            <PostCard 
                                post={post} 
                                key={post?.id} 
                                idx={idx} 
                                favoritos={favorites}
                                updateFavoritePost={updateFavoritePost}
                                handleOpen={handleOpen} 
                            />
                        )
                    })
            }
        </div>  
    </>
  )
}