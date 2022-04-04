import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activePost } from '../../redux/actions/notes';


export const JournalEntry = ( {id, date, title, body, url} ) => {
    
    //console.log(id, date, title, body, url);
    const dispatch = useDispatch();

    const noteDate = moment(date);
    //console.log(noteDate);

    const handleEntryClick = () => {
        //dispatch activePost
        dispatch( activePost( id, {
            title, body, date, url
            })
        );

    }

    return (
        <div 
            className="journal__entry animate__animated animate__fadeIn animate__faster"
            onClick = { handleEntryClick }
        >
            {/*Imagen */}
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
                <span>{ noteDate.format('dddd') }</span>
                <h4>{ noteDate.format('Do') }</h4>
            </div>
        </div>
    )
}
