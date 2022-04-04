import React from 'react';
import { useSelector } from 'react-redux';

import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activePost } from '../../redux/actions/notes';

export const PostsPage = () => {

  const { notes: posts } = useSelector(state => state.notes);

  const dispatch = useDispatch();


   const handleEntryClick = (id, date, title, body, url) => {
       //dispatch activePost
       dispatch( activePost( id, {
           title, body, date, url
        })
       );

    }
  return (
    <div>
        {
            posts.map( ({id, date, title, body, url}) => (
                <div 
                    onClick = { () => handleEntryClick(id, date, title, body, url) }
                    key={id}
                >
                    {
                         url && //si url es diferente de undefined
                         <div 
                             className="journal__entry-picture"
                             style={{
                                 backgroundSize: 'cover',
                                 backgroundImage: `url(${ url })`
                             }}
                         ></div>
                    }
                    {/*Contenedor del texto y otras cosas... */}
                    <div className="journal__entry-body">
                        <p className="journal__entry-title">
                            { title }
                        </p>
                        <p className="journal__entry-content">
                            { body }
                        </p>
                    </div>
                    {/*Para la fecha */}
                    <div className="journal__entry-date-box">
                        <span>{ moment(date).format('dddd') }</span>
                        <h4>{ moment(date).format('Do') }</h4>
                    </div>
                </div>
            ))
        }
    </div>
  )
}
