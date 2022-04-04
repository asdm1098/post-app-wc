import React from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../redux/actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active: note } = useSelector( state => state.notes );
    const today = moment(new Date()).format("DD/MM/YYYY");

    const handleSave = () => {
        // console.log( note );
        dispatch( startSaveNote( note ) );
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if ( file ) {
            dispatch( startUploading( file ));
        }
    }

    return (
        <div className="notes__appbar">
            <span>{today}</span>
            
            <input 
                id="fileSelector"
                type="file"
                style={{ display: 'none' }}
                onChange={ handleFileChange}
            />

            <div>
                <button 
                    className="btn"
                    onClick={ handlePictureClick }
                >
                    Picture
                </button>
                
                <button 
                    className="btn"
                    onClick = { handleSave }
                >
                    Save
                </button>
            </div>
        </div>
    )
}
