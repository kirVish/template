import { getTokenFromUrl } from './auth.js'

var _baseUri = 'https://api.spotify.com/v1';
const SPOTIFY_TOKEN = 'spotifyToken';
const TOKEN_EXPIRE_CODE = 401;

const access_token = getTokenFromUrl();
if (access_token) {
    // Обновим токен
    localStorage.setItem(SPOTIFY_TOKEN, access_token);
    window.location.hash = '';
}

// Получим токкен из hash или из localStorage
export const token = localStorage.getItem(SPOTIFY_TOKEN);

/**
 * Сброс токена и переход на страницу авторизации Spotify
 */
export const resetToken = () => {
    localStorage.removeItem(SPOTIFY_TOKEN);
    window.location.reload();
}

/**
 * Хелпер для запросов
 * @param {string} url 
 * @returns 
 */
const fetchData = async (url) => {
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            },
        })
        if (response.status === TOKEN_EXPIRE_CODE) {
            resetToken();
            return;
        }
        return await response.json();
    } catch (e) {
        console.error(e);
    }
}

/**
 * Получение треков по id
 * @param {string[]} trackIds 
 * @returns 
 */
export async function getTracks(trackIds) {
    const url = _baseUri + '/tracks?' + trackIds.join(',');
    const {tracks} = await fetchData(url);
    return tracks.items;
}

/**
 * Поиск по слову (альбом/трек)
 * @param {string} search 
 * @param {string} type 
 * @returns 
 */
export async function getBySearch(search = '', type = 'album') {
    const url = `https://api.spotify.com/v1/search?q=${search}&type=${type}`
    const data = await fetchData(url);
    return data[type + 's'].items;
}

/**
 * Поиск по категории (например 'toplist')
 * @param {string} category 
 * @returns 
 */
export async function getByCategories(category) {
    const url = `https://api.spotify.com/v1/browse/categories/${category}/playlists`
    const data = await fetchData(url);
    return data.playlists.items;
}

/**
 * Поиск треков по id плейлиста
 * @param {string} playlistId 
 * @returns 
 */
export async function getByPlaylist(playlistId) {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}`;
    const data = await fetchData(url);
    return data.tracks.items;
}
