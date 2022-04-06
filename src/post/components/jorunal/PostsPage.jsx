import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import { startDeletingPost, startLoadingPost, startSavePost, updateFavoritesPosts } from '../../redux/actions/posts';
import { PostCard } from './PostCard';
import { ModalEdit } from './Modal';

import './styles.css';

export const PostsPage = () => {
    
  const { location } = useHistory();
  const dispatch = useDispatch();
  const { posts, favorites  } = useSelector(state => state.posts);
  
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  
    useEffect(() => {
        dispatch( startLoadingPost() );
    }, [dispatch]);

    
    useEffect(() => {
        console.log('favoritos: ', favorites);
    }, [favorites]);

    const updateFavoritePost = (post) => {
        const updated = [...favorites];
        const isFavorite = updated.findIndex( p => p.id === post.id);
         if (isFavorite >= 0) {
            updated.splice(isFavorite, 1);
            dispatch(startDeletingPost(post.id));
        } else {
            updated.push(post);
            dispatch(startSavePost(post));
        }
        dispatch(updateFavoritesPosts(updated));
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