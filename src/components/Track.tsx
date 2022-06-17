import React, { FC } from 'react'
import { ITrack } from '../interfaces';

interface IProps extends ITrack {
  onPress: () => void;
  isPlaying: boolean;
}

/**
* @author
* @function @Track
**/

export const Track:FC<IProps> = ({name, album, isPlaying, onPress}) => {
  return (
    <div 
      className="track cursor-pointer bg-gray-200 rounded-lg p-5"
      onClick={onPress}
    >
        <div className="relative pt-full mb-4">
        <img className="track-img block w-full absolute inset-0" src={album?.images?.[0].url} alt=""/>
        </div>
        <div className="track-title text-sm text-white text-line-clamp-1 mb-1 block">{name}</div>
        <div className="relative pb-5">
        <span className="track-artist text-xs text-gray-100 text-line-clamp-1">{album?.artists?.[0]?.name}</span>
        <button className="absolute right-0 top-0 w-10 h-10 bg-green-200 rounded-full flex text-white">
            <svg className="fill-current h-5 w-5 m-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              {
                isPlaying ?
                  <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" /> :
                  <path d="M15 10.001c0 .299-.305.514-.305.514l-8.561 5.303C5.51 16.227 5 15.924 5 15.149V4.852c0-.777.51-1.078 1.135-.67l8.561 5.305c-.001 0 .304.215.304.514z"/>
              }
            </svg>
        </button>
        </div>
    </div>
   )
 }
