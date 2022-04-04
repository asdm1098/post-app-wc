import React from 'react';
import { Drawer, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Lists } from './List';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Navbar } from './Navbar';


const drawerWidth = 240;

const styles = makeStyles( theme=> ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    toolbar: theme.mixins.toolbar,
}))

export const DrawerC = ( props ) => {
    const classes = styles();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const container = window !== undefined ? () => window().document.body : undefined;

    const drawer = (
        <div>
            <div className={ classes.toolbar } />
                    <Divider />
                    <Lists />
        </div>
    )
    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar handleOpen={ handleDrawerToggle } />

        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            >
            {drawer}
            </Drawer>
            <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
            >
            {drawer}
            </Drawer>
        </Box>
        
        </Box>
        )
    }