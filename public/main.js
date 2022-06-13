import { loginUrl } from './auth.js'
import { token, getByCategories, getByPlaylist, getBySearch, resetToken } from './spotifyApi.js'
import { play } from './player.js';

const root = document.querySelector('#root');
const playerPageTemplate = document.querySelector('#playerPageTemplate');
const clonePlayerPage = playerPageTemplate.content.cloneNode(true);
let trackList;

// Если токен - есть, то запрашиваем данные и отрисовываем, если нет, то рисуем страницу авторицзации
if (token) {
    trackList = document.querySelector('#trackList');
    root.appendChild(clonePlayerPage);
    toTopList();
    subscribe();
} else {
    const loginPageTemplate = document.querySelector('#loginPageTemplate');
    const cloneLoginPage = loginPageTemplate.content.cloneNode(true);
    root.appendChild(cloneLoginPage);
    
    const loginButton = document.querySelector('#loginButton');
    loginButton.setAttribute('href', loginUrl);
}

/**
 * Запрос и отрисовка чарта
 */
async function toTopList() {
    const topList = await getByCategories('toplists');
    trackList.innerHTML = '';
    const playlistId = topList[0].id;
    const tracks = await getByPlaylist(playlistId);
    createTrackList(tracks);
}

/**
 * Поиск треков
 * @param {string} searchString 
 * @returns 
 */
async function toSearch(searchString) {
    // Сбрасываем предыдущий поиск
    trackList.innerHTML = '';
    if (!searchString) return;
    
    let tracks = [];
    if (searchString) {
        tracks = await getBySearch(searchString, 'track');
    } 
    
    let emptySearch = document.querySelector('.empty-search');
    if (emptySearch && tracks.length) {
        emptySearch.remove();
    } else if (!emptySearch) {
        const emptySearchTemplate = document.querySelector('#empty-search-template');
        emptySearch = emptySearchTemplate.content.cloneNode(true);
        document.querySelector('.track-list-wrapper').appendChild(emptySearch);
    }

    createTrackList(tracks, true);
}   

/**
 * Отрисовка списка треков
 * @param {object[]} tracks 
 * @param {boolean} isSearch 
 */
const createTrackList = (tracks, isSearch) => {
    tracks.forEach((item) => {
        let track = item
        if (!isSearch) {
            track = item.track;
        }
        createTrack(track)
    });
}

/**
 * Формирование плитки с треком по объекту с данными
 * @param {object} track
 */
const createTrack = (track) => {
    const img = track.album?.images?.[0]?.url || '';
    const trackTemplate = document.querySelector('#trackTemplate');
    const trackList = document.querySelector('#trackList');
    const cloneTrack = trackTemplate.content.cloneNode(true);
    const artist = track.artists?.[0]?.name || 'Unknown artist';

    const trackContainer = cloneTrack.querySelector('.track');
    if (track.preview_url) {
        trackContainer.setAttribute('data-src', track.preview_url);
    }
    trackContainer.setAttribute('data-preview', img);
    trackContainer.setAttribute('data-title', track.name);
    trackContainer.setAttribute('data-artist', artist);

    cloneTrack.querySelector('.track-title').innerText = track.name;
    cloneTrack.querySelector('.track-artist').innerText = artist;
    cloneTrack.querySelector('.track-img').src = img;
    const trackTile = cloneTrack.querySelector('.track');
    if (!track.preview_url) {
        cloneTrack.querySelector('button').classList.add('hidden');
        trackTile.setAttribute('title', 'Трек не доступен для воспроизведения');
    } else {
        trackTile.setAttribute('title', 'Кликните, чтобы воспроизвести трек');
    }
    trackList.append(cloneTrack);
}

/**
 * При переходе на страницу с поиском добавляем поиск
 */
const addSearch = () => {
    const headerButtons = document.querySelector('#headerButtons');
    const searchTemplate = document.querySelector('#searchTemplate');
    const cloneSearch = searchTemplate.content.cloneNode(true);
    let search = document.querySelector('#search');
    if (!search) {
        headerButtons.appendChild(cloneSearch);
        search = document.querySelector('#search');
        search.addEventListener('change', (e) => {
            toSearch(e.target.value);
        })
    }
}

/**
 * Удаляем поиск при переходе со страницы поиска
 */
const removeSearch = () => {
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer) {
        searchContainer.remove();
    }

    const emptySearch = document.querySelector('.empty-search');
    if (emptySearch) {
        emptySearch.remove();
    }
}

/**
 * Подписка на события переключения по вкладкам и т.д.
 */
function subscribe() {
    trackList = document.querySelector('#trackList');
    const mainTab = document.querySelector('.main-tab');
    const searchTab = document.querySelector('.search-tab');
    const logoutButton = document.querySelector('.logout-button');

    let currentTab = 'main';

    const toggleTabClasses = (selectedTab) => {
        [mainTab, searchTab].forEach(tab => {
            tab.classList.remove('bg-gray-200', 'text-white');
            tab.classList.add('text-gray-100', 'hover:text-white');
        })

        selectedTab.classList.add('bg-gray-200', 'text-white');
        selectedTab.classList.remove('text-gray-100', 'hover:text-white');
    }

    mainTab.addEventListener('click', () => {
        if (currentTab !== 'main') {
            currentTab = 'main';
            removeSearch();
            toTopList();
            toggleTabClasses(mainTab);
        } 
    })

    searchTab.addEventListener('click', () => {
        if (currentTab !== 'search') {
            currentTab = 'search';
            addSearch();
            toSearch();

            let emptySearch = document.querySelector('.empty-search');
            if (!emptySearch) {
                const emptySearchTemplate = document.querySelector('#empty-search-template');
                emptySearch = emptySearchTemplate.content.cloneNode(true);
                document.querySelector('.track-list-wrapper').appendChild(emptySearch);
            }
            toggleTabClasses(searchTab);
        }
    })

    trackList.addEventListener('click', (event) => {
        const data = event.target.closest('.track').dataset;
        if (data) {
            play(data);
        }
    })

    logoutButton.addEventListener('click', () => {
        resetToken();
    })
}