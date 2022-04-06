import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { Box, Button, TextField, Modal, TextareaAutosize  } from '@mui/material';

import { useForm } from '../../hook/useForm';
import { activePost } from '../../redux/actions/notes';
import { startSavePost } from '../../redux/actions/posts';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };


export const ModalEdit = ({ open, handleClose }) =>  {
    const { active } = useSelector(state => state.posts);
    // const { title, body } = active;
    const [ formValues, handleInputChange, reset ] = useForm(active);
    const { id, title, body } = formValues;

    const activeId = useRef( active.id ); //almaceno el id de la nota activa
    
    useEffect(() => {
        
        if( active.id !== activeId.current ) {
            reset( active );
            activeId.current = active.id
        }
        
    }, [ active, reset ]);

    const dispatch = useDispatch() 
    useEffect(() => {
        dispatch( activePost( formValues.id, { ...formValues }) )
    }, [formValues, dispatch])

    const handleSave = async() => {
        console.log(id, title, body);
        dispatch( startSavePost(active) );
        handleClose();
    }

    const bodym = (
        <>
            <div align="center">
                <h2>Editar</h2>
            </div>
            <div>
                <TextField 
                    style={{width: '100%'}} 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name = 'title'
                    value = { title }
                    onChange = { handleInputChange }
                />
            </div>
                <br />
            <div>
                <TextareaAutosize 
                    style={{width: '100%'}} 
                    minRows={2}
                    maxRows={8}
                    name = 'body'
                    value = { body }
                    onChange = { handleInputChange }

                />
            </div>
            <br/>
            <div align="center">
                <Button color="primary" onClick={ handleSave }>Guardar</Button>
                <Button onClick={ handleClose } >Cancelar</Button>
            </div>
        </>
  
    )
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400}} >
                    {bodym}
                </Box>
        </Modal>
        </div>
    );
}
