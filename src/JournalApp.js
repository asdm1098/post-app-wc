import React from 'react';

import { AppRouter } from './routers/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { theme } from './styles/themeConfig';
import { ThemeProvider } from '@mui/material/styles';

export const JournalApp = () => {
    return (
        <Provider store={ store }>
            <ThemeProvider theme={theme}>
                <AppRouter />
            </ThemeProvider>
        </Provider>
    )
}
