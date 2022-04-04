import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { activePost, startDeleting } from '../../redux/actions/notes';
import { useForm } from '../../hook/useForm';

import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    //Referencia a la nota activa
    const { active: note } = useSelector(state => state.notes);
    //console.log( note );
    const [ formValues, handleInputChange, reset ] = useForm(note); 
    //console.log(formValues);
    const { body, title, id} = formValues;

    const activeId = useRef( note.id ); //almaceno el id de la nota activa
    
    ///////////////////////////////////////
    //actualizar nota cada que cambie el id
    useEffect(() => {
        
        if( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id
        }
        
    }, [ note, reset ])
    //////////////////////////////////////////

    //////////////////////////////////////////////
    //Cambiar el store de lo que escriba el usuario
    const dispatch = useDispatch() 
    useEffect(() => {
        dispatch( activePost( formValues.id, { ...formValues }) )
    }, [formValues, dispatch])
    //////////////////////////////////////////////////

    const handleDelete = () => {
        dispatch( startDeleting( id ));
    }

    return (
        <div className="notes__main-content"> 
            <NotesAppBar />

            {/*Agrupador de mi formulario */}
            <div className="notes__content">
                
                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name = 'title'
                    value = { title }
                    onChange = { handleInputChange }
                />

                <textarea
                    placeholder="Some awesome post"
                    className="notes__textarea"
                    name = 'body'
                    value = { body }
                    onChange = { handleInputChange }
                ></textarea>

                {   
                    (note.url) 
                    && (
                        <div className="notes__image">
                            <img
                                src={ note.url }
                                alt="Imagen"
                            />
                        </div>
                        )               
                }

            </div>
            
            <button 
                className="btn btn-danger"
                onClick = { handleDelete }
            >
                Delete
            </button>
        </div>

    )
}
