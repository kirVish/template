import React, { FC, useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Player } from '../components/Player'
import { Sidebar } from '../components/Sidebar'
import { TrackList } from '../components/TrackList'
import { plugTrack } from '../consts'
import { ITrack } from '../interfaces'

interface IProps {}

/**
* @author
* @function @MainPage
**/

export const MainPage:FC<IProps> = (props) => {

  const [curTrack, setCurTrack] = useState<ITrack>(plugTrack);
  const [isPlaying, setPlaying] = useState<boolean>(false);

  const handleTrackClick = (track?: ITrack) => {
    const newTrack = track ?? curTrack;
    setCurTrack((oldTrack) => {
      if (oldTrack.id === newTrack.id) {
        setPlaying(!isPlaying); 
      } else {
        setPlaying(true);
      }
      return newTrack;
    });
  } 

  return (
    <div className="grid grid-rows-3 grid-cols-6 h-full">

      <nav className="col-span-1 row-span-3 bg-gray-700 pt-6">
        <Sidebar />
      </nav>

      <main className="col-span-5 row-span-3 overflow-auto">
        <Header />
        <TrackList
          onTrackClick={handleTrackClick}
          curTrack={curTrack}
        />
      </main>
      
      <footer className="bg-gray-200 col-span-6 p-4 grid grid-cols-3 gap-6">
        <Player
          {...curTrack}
          isPlaying={isPlaying}
          onPlayPause={handleTrackClick}
        />
      </footer>

    </div>  
  )
}
