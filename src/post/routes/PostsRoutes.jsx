import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
import { Navbar } from '../components/ui/Navbar';
import { DrawerC } from '../components/ui/Drawer';

import { NothingSelected } from '../components/jorunal/NothingSelected';

import { PostsPage } from '../components/jorunal/PostsPage';
import { JournalScreen } from '../components/jorunal/JournalScreen';
import { NoteScreen } from '../components/notes/NoteScreen';

const styles = makeStyles(theme => ({
    root: {
        display: 'flex',
        marginTop: '0px',
        overflowX: 'hidden',
    },
    toolbar: theme.mixins.toolbar, //espaciado
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(0),
        overflowX: 'hidden',

    },
}));

export const PostsRoutes = () => {

    const classes = styles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen( !open )
    }

    return (
        <div className={ classes.root }>
            
            <Navbar handleOpen={ handleOpen } />
            <DrawerC />

            <div className={ classes.content }>
                <div className={ classes.toolbar } />
                    <Switch>

                        <Route exact path="/create" component= { JournalScreen } />
                        <Route exact path="/posts" component= { PostsPage } />
                        <Route exact path="/nothing" component= { NothingSelected } />
                        <Route exact path="/favorites" component= { PostsPage } />

                        <Redirect to="/create" />
                    </Switch>
            </div>
        </div>
    )
}
