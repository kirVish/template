import React, { useEffect, useState } from 'react';
import { AuthPage } from './pages/AuthPage';
import { MainPage } from './pages/MainPage';

function App() {
    const [token, setToken] = useState('');
    
    const getTokenFromUrl = () =>
        window.location.hash.match(/(?<=access_token=)[^]*?(?=&)/)?.[0]

    useEffect(() => {
        const SPOTIFY_TOKEN = 'spotifyToken';

        const access_token = getTokenFromUrl();
        if (access_token) {
            // Обновим токен
            localStorage.setItem(SPOTIFY_TOKEN, access_token);
            window.location.hash = '';
        }

        // Получим токкен из hash или из localStorage
        const tk = localStorage.getItem(SPOTIFY_TOKEN);
        if (tk) {
            setToken(tk);
        }
    }, []);

    return (
        token ?
            <MainPage />
            :
            <AuthPage />
    );
}

export default App;
