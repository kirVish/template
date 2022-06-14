import React, { FC, useEffect, useState } from 'react'
import { getByCategories, getByPlaylist } from '../api/spotifyApi';
import { TOP_LIST } from '../consts';
import { ITrack } from '../interfaces';
import { Track } from './Track';

interface ITopTrack {
  track: ITrack;
}

type ILoadTrack = ITrack & ITopTrack;

interface IProps {
  isSearch?: boolean;
  onTrackClick: (track: ITrack) => void;
  curTrack?: ITrack;
}

/**
* @author
* @function @TrackList
**/

export const TrackList:FC<IProps> = ({isSearch, curTrack, onTrackClick}) => {

  const [tracks, setTracks] = useState<ILoadTrack[]>([]);

  const filterTracks = (data: ILoadTrack[]) => data.filter(item => {
    const track = isSearch ? item : item.track;
    return !!track.preview_url;
  }) 

  useEffect(() => {
    (async function() {
      const topList = await getByCategories(TOP_LIST);
      const playlistId = topList[0].id;
      const data = await getByPlaylist(playlistId);
      setTracks(() => filterTracks(data));
    })()
  }, [])

  const handleTrackClick = (track: ITrack) => {
    onTrackClick(track);
  }

  return (
    <section className="track-list-wrapper px-6 grid gap-6 mb-8">
        <div id="trackList" className="grid grid-cols-6 gap-4">
        {
          tracks.length ?
          tracks.filter((item) => item.track.preview_url).map(item => {
            const track = isSearch ? item : item.track;
            return <Track
                      key={track.id}
                      isPlaying={track.id === curTrack?.id}
                      onPress={() => handleTrackClick(track)}
                      {...track}
                    />
          })
          :
          <div>Список пуст</div>
        }
        </div>
    </section>
   )
 }
