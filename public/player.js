const DURATION = 30;
let isSubscribe = false;

const getElements = () => {
    const player = document.querySelector('#player');
    return {
        audio: document.querySelector('#audio'),
        img: player.querySelector('img'),
        playerTitle: player.querySelector('.player-title'),
        playerAuthor: player.querySelector('.player-author'),
        playButton: player.querySelector('.play-button'),
        timeLine: player.querySelector('.time-line'),
        timeWrapper: player.querySelector('.time-wrapper'),
        startTime: player.querySelector('.start-time'),
        endTime: player.querySelector('.end-time')
    }
}

const togglePlaying = () => {
    const {audio, playButton} = getElements();
    const [pauseIcon, playIcon] = playButton.querySelectorAll('path');
    if (audio.paused) {
        audio.play();
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
    } else {
        audio.pause();
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    }
}

const subscribe = () => {
    isSubscribe = true;

    const {audio, playButton, timeLine, timeWrapper, startTime, endTime} = getElements();

    playButton.addEventListener('mousedown', (e) => {
        togglePlaying();
    })

    audio.addEventListener('timeupdate', (e) => {
        const currentTime = e.target.currentTime;
        timeLine.style.width = currentTime / DURATION * 100 + '%';
        let time = '' + parseInt(currentTime);
        if (time.length < 2) {
            time = '0' + time; 
        }
        time = '0:' + (time || '00');
        startTime.innerText = time;
        endTime.innerText = '0:' + (parseInt(audio.duration) || '00');
    });

    timeWrapper.addEventListener('mousedown', (e) => {
        const newTime = e.offsetX / timeWrapper.clientWidth * DURATION; 
        audio.currentTime = newTime;
        if(audio.paused) {
            togglePlaying();
        }
    })
}

export const play = ({src, preview, title, artist}) => {
    const {audio, img, playerTitle, playerAuthor} = getElements();

    if (!isSubscribe) {
        subscribe();
    }

    if (audio.src !== src) {
        img.src = preview;
        playerTitle.innerText = title;
        playerAuthor.innerText = artist;
        audio.src = src;
        audio.volume = 0.3;
    }
    togglePlaying();
}