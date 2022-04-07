import React from 'react';
import { useDispatch } from 'react-redux';
import { setActivePost, startDeleting } from '../../redux/actions/posts';

import './styles.css';

export const PostCard = (props) => {
    const dispatch = useDispatch();

    const { post, idx, favoritos, updateFavoritePost, handleOpen } = props;
    const { title, body } = post;
    const blackHeart = "🖤";
    const delet = "❌"
    const edit = "✍";
    const redHeart = "❤️";
   
    const heart = favoritos.includes(post) ? redHeart : blackHeart;
    
    // const isFavorite = updated.findIndex( p => p.id === post.id);

    const clickHeart = () => {
        updateFavoritePost(post);
    };

    const handleEdit = () => {
        dispatch( setActivePost(post));
        handleOpen();
    }

    const handleDelete = () => {
        dispatch(startDeleting(post))
    }

  return (
      
    <div>
        <div className="post-card">
    
            <div className="card-body" >
                <div className="card-top">
                    <h3>{title}</h3>
                    <div>#{idx+1}</div>
                </div>
                <div className="card-bottom">
                <div className="post-type">
                    {
                        <div className="post-type-text">
                            {body}
                        </div>
                    }
                </div>
                <button onClick={handleEdit} className="post-heart-btn">
                    <div className="post-favorite">{edit}</div>
                </button>
                <button onClick={handleDelete} className="post-heart-btn">
                    <div className="post-favorite">{delet}</div>
                </button>
                <button onClick={clickHeart} className="post-heart-btn">
                    <div className="post-favorite">{heart}</div>
                </button>
                </div>
            </div>
            </div>
    </div>
  )
}
