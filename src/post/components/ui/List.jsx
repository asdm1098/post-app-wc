import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { NoteAdd, Dashboard, Star } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

export const Lists = () => {

    return (
        <div>
            <List component='nav'>
                <NavLink activeStyle={{color: '#1565c0'}} to="/create" style={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)'}}>
                    <ListItem button>
                        <ListItemIcon>
                            <NoteAdd />
                        </ListItemIcon>
                        <ListItemText primary='Mis Posts'/>
                    </ListItem>
                </NavLink>

                <NavLink activeStyle={{color: '#1565c0'}} to="/posts" style={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)'}}>
                    <ListItem button>
                        <ListItemIcon>
                            <Dashboard />
                        </ListItemIcon>
                        <ListItemText primary='Lista de posts' />
                    </ListItem>
                </NavLink>

                <NavLink activeStyle={{color: '#1565c0'}} to="/favorites" style={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)'}}>
                    <ListItem button>
                        <ListItemIcon>
                            <Star />
                        </ListItemIcon>
                        <ListItemText primary='Favoritos' />
                    </ListItem>
                </NavLink>

                <Divider/>

            </List>
        </div>
    )
}
