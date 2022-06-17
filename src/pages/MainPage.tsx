import React, { FC, useState } from 'react'
import { Header } from '../components/Header'
import { Player } from '../components/Player'
import { Sidebar } from '../components/Sidebar'
import { TrackList } from '../components/TrackList'
import { CUR_TAB } from '../interfaces'

/**
* @author
* @function @MainPage
**/

export const MainPage:FC = (props) => {

  const [curTab, setCurTab] = useState(CUR_TAB.MAIN);
  
  const handleMainTab = () => {
    setCurTab(CUR_TAB.MAIN);
  }

  const handleSearchTab = () => {
    setCurTab(CUR_TAB.SEARCH);
  }

  return (
    <div className="grid grid-rows-3 grid-cols-6 h-full">

      <nav className="col-span-1 row-span-3 bg-gray-700 pt-6">
        <Sidebar {...{handleMainTab, handleSearchTab, curTab}}/>
      </nav>

      <main className="col-span-5 row-span-3 overflow-auto">
        <Header curTab={curTab} />
        <TrackList curTab={curTab} />
      </main>
      
      <footer className="bg-gray-200 col-span-6 p-4 grid grid-cols-3 gap-6">
        <Player />
      </footer>

    </div>  
  )
}
