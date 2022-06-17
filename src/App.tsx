import React, { useState } from 'react';
import { SPOTIFY_TOKEN } from './consts';
import { AuthPage } from './pages/AuthPage';
import { MainPage } from './pages/MainPage';

function App() {
    const getTokenFromUrl = () =>
        window.location.hash.match(/(?<=access_token=)[^]*?(?=&)/)?.[0]

    const getToken = () => {
        const access_token = getTokenFromUrl();
        if (access_token) {
            // Обновим токен
            localStorage.setItem(SPOTIFY_TOKEN, access_token);
            window.location.hash = '';
        }

        // Получим токкен из hash или из localStorage
        return localStorage.getItem(SPOTIFY_TOKEN);
    }

    const [token] = useState(getToken);

    return (
        token ?
            <MainPage />
            :
            <AuthPage />
    );
}

export default App;
