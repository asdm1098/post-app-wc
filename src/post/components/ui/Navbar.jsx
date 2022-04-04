import React from 'react';
import { AppBar,Button, IconButton, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Menu } from '@mui/icons-material';

import { useDispatch } from 'react-redux';
import { startLogout } from '../../redux/actions/auth';

const drawerWidth = 240;

const useStyles = makeStyles( theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
        [ theme.breakpoints.up('sm') ]: {
            display: 'none',
        }
    },
    title: {
        flexGrow: 1
    },
    appBar: {
        [ theme.breakpoints.up('sm') ]: {
            width: `calc(100% - ${drawerWidth}px )`,
            marginLeft: drawerWidth
        }
    },

}));

export const Navbar = ( props ) => {

    const dispatch = useDispatch();
    const classes = useStyles()

    const handleLogout = () => {
        dispatch( startLogout() );
    }

    return (
        <AppBar className={ classes.appBar }>
            <Toolbar>
                <IconButton 
                    color="secondary" 
                    aria-label="menu" 
                    className={classes.menuButton}
                    onClick = { ()=> props.handleOpen() }
                >
                    <Menu />
                </IconButton>

                <Typography variant='h6' className={classes.title}>
                    POSTS
                </Typography>

                <Button 
                    variant="text" 
                    color="inherit"
                    onClick={ handleLogout }
                >
                    Salir
                </Button>
            </Toolbar>
        </AppBar>
    )
}
