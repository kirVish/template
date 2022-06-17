import React, { FC, useEffect, useMemo, useRef, useState, MouseEvent } from 'react'
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

const DEFAULT_DURATION = 30;

/**
* @author
* @function @Player
**/

export const Player:FC = () => {

  const {tracks} = useTypedSelector(state => state.tracks);
  const {track, playing} = useTypedSelector(state => state.player);
  const {play, pause, changeTrack} = useActions();

  const [curTime, setCurTime] = useState('0:00');
  const [timeLineWidth, setTimeLineWidth] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioEl = useRef<HTMLAudioElement>(null);
  const audio = audioEl.current;

  const togglePlaying = () => {
    audio?.paused ? play() : pause(); // По клику на кнопку сначала попадаем сюда, а потом в useEffect
  }

  useEffect(() => {
    audio?.play()
  }, [track.id])

  useEffect(() => {
    if (playing) {
      audio?.play();
    } else {
      audio?.pause();
    }
  }, [playing])

  const handleAudioLoad = () => {
    const duration = audio?.duration ?? DEFAULT_DURATION;
    setDuration(parseInt('' + duration));
  }

  const handleAudioTime = () => {
    const curTime = audio?.currentTime || 0;
    let time: string = '' + parseInt('' + audio?.currentTime);
    if (time.length !== 2) {
      time = '0' + time;
    }
    setTimeLineWidth(curTime / (audio?.duration || DEFAULT_DURATION) * 100);
    setCurTime(`0:${time}`);
    if (audio?.ended) {
      pause();
    }
  }

  const handleTimeLineWrapClick = ({target, nativeEvent}: MouseEvent<HTMLDivElement>) => {
    const tg = target as HTMLDivElement;
    const newTime = nativeEvent.offsetX / tg.clientWidth * (audio?.duration || DEFAULT_DURATION);
    if (audio) {
      audio.currentTime = newTime;
      play();
    }
  }

  const handlePrevNext = (toNext: boolean) => {
    let index: number = tracks.findIndex(item => item.id === track?.id);
    toNext ? index++ : index--; 
    const newTrack = tracks[index];
    if (newTrack) {
      changeTrack(newTrack);
    }
  }

  return (
    <>
      <audio
        ref={audioEl}
        className="hidden"
        controls
        src={track.preview_url}
        id="audio"
        onTimeUpdate={handleAudioTime}
        onLoadedData={handleAudioLoad}
      ></audio>
      <div className="flex items-center">
        <img className="h-14 w-14 mr-4 flex-shrink-0" src={track?.album?.images?.[0].url || 'https://picsum.photos/56.webp?random=10'} alt=""/>
        <div className="mr-4">
          <div className="player-title text-sm text-white text-line-clamp-1 font-light">
            {track?.name || 'Неизвестно'}
          </div>
          <div className="text-xs text-gray-100 text-line-clamp-1">
            <span className="player-author">{track?.album?.artists?.[0].name || 'Неизвестный'}</span>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-center mb-3">
          <button onClick={() => handlePrevNext(false)} className="w-5 h-5 text-gray-100 mr-6">
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z" />
            </svg>
          </button>
          <button
            className="play-button w-8 h-8 border border-gray-300 rounded-full flex text-gray-100 mr-6"
            onClick={togglePlaying}
          >
            <svg
              className="fill-current h-5 w-5 m-auto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              {
                playing ?
                  <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" /> :
                  <path d="M15 10.001c0 .299-.305.514-.305.514l-8.561 5.303C5.51 16.227 5 15.924 5 15.149V4.852c0-.777.51-1.078 1.135-.67l8.561 5.305c-.001 0 .304.215.304.514z"/>
              }
            </svg>
          </button>
          <button onClick={() => handlePrevNext(true)} className="w-5 h-5 text-gray-100 mr-6">
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z" />
            </svg>
          </button>
        </div>
        <div className="flex items-center">
          <span className="start-time text-xs text-gray-100 font-light">{ curTime || '0:00' }</span>
          <div
            className="time-wrapper cursor-pointer overflow-hidden relative flex-1 mx-2 rounded"
            onClick={handleTimeLineWrapClick}
          >
            <div className="border-b-4 border-gray-400 rounded"></div>
            <div
              className="time-line transform absolute inset-x-0 top-0 w-0 border-b-4 border-gray-100 rounded hover:border-green-200"
              style={{width: timeLineWidth + '%'}}
            ></div>
          </div>
          <span className="end-time text-xs text-gray-100 font-light">{ duration ? '0:' + duration : '0:00' }</span>
        </div>
      </div>
    </>
   )
 }
