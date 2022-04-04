//sistema de rutas principal
import React, { useEffect, useState } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Redirect,
  } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { firebase } from '../config/firebase-config';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';


// import { JournalScreen } from '../components/jorunal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../post/redux/actions/auth';
import { PostsRoutes } from '../post/routes/PostsRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../post/redux/actions/notes';

export const AppRouter = () => {
    
    const dispatch = useDispatch();

    //Respuesta del fireStore para saber si tiene UID, osea usuario logueado
    //estado local
    const [ cheking, setCheking ] = useState(true);

    //Controlador de la rutas privada o publica
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    //pendiente de los datos de autenticación usId, displayName de la sesión
    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( async(user) => {

            if ( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );

                //función regreso notes
                dispatch( startLoadingNotes( user.uid ) );

            } else {
                setIsLoggedIn( false );
            }

            setCheking(false);

        });
       
    }, [ dispatch, setCheking, setIsLoggedIn ]);

    if ( cheking ) {
        return (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
        )
    }


    return (
        <Router>
              <div>  
                <Switch>
                    <PublicRoute 
                        path="/auth" 
                        component={ AuthRouter } 
                        isLoggedIn = { isLoggedIn }
                    />
                    
                    <PrivateRoute 
                        path="/"
                        component={ PostsRoutes } 
                        isLoggedIn = { isLoggedIn }
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}
