import React, { FC, useEffect, useRef, useState } from 'react'
import { ITrack } from '../interfaces';

interface IProps extends ITrack {
  onPlayPause: () => void;
}

/**
* @author
* @function @Player
**/

export const Player:FC<IProps> = ({id, isPlaying, name, album, preview_url, onPlayPause}) => {

  const audioEl = useRef<HTMLAudioElement>(null);
  const audio = audioEl.current;
  if (audio) audio.volume = 0.05; // FIXME Удалить

  const togglePlaying = () => {
    if (audio?.paused) {
      audio?.play();
    } else {
      audio?.pause();
    }
  }

  useEffect(() => {
    togglePlaying();
  }, [id, isPlaying])

  return (
    <>
      <audio ref={audioEl} className="hidden" controls src={preview_url} id="audio"></audio>
      <div className="flex items-center">
        <img className="h-14 w-14 mr-4 flex-shrink-0" src={album?.images?.[0].url || 'https://picsum.photos/56.webp?random=10'} alt=""/>
        <div className="mr-4">
          <div className="player-title text-sm text-white text-line-clamp-1 font-light">
            {name || 'Неизвестно'}
          </div>
          <div className="text-xs text-gray-100 text-line-clamp-1">
            <span className="player-author">{album?.artists?.[0].name || 'Неизвестный'}</span>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-center mb-3">
          <button title="Функция временно недоступна" className="w-5 h-5 text-gray-100 mr-6">
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
            onClick={onPlayPause}
          >
            <svg
              className="fill-current h-5 w-5 m-auto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              {
                isPlaying ?
                  <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" /> :
                  <path d="M15 10.001c0 .299-.305.514-.305.514l-8.561 5.303C5.51 16.227 5 15.924 5 15.149V4.852c0-.777.51-1.078 1.135-.67l8.561 5.305c-.001 0 .304.215.304.514z"/>
              }
            </svg>
          </button>
          <button title="Функция временно недоступна" className="w-5 h-5 text-gray-100 mr-6">
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
          <span className="start-time text-xs text-gray-100 font-light">0:00</span>
          <div className="time-wrapper cursor-pointer overflow-hidden relative flex-1 mx-2 rounded">
            <div className="border-b-4 border-gray-400 rounded"></div>
            <div
              className="time-line transform absolute inset-x-0 top-0 w-0 border-b-4 border-gray-100 rounded hover:border-green-200"
            ></div>
          </div>
          <span className="end-time text-xs text-gray-100 font-light">0:00</span>
        </div>
      </div>
    </>
   )
 }
