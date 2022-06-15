import { FC, useEffect } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ITrack } from '../interfaces';
import { Track } from './Track';

interface IProps {}

/**
* @author
* @function @TrackList
**/

export const TrackList:FC<IProps> = (props: IProps) => {

  const {tracks} = useTypedSelector(state => state.tracks);
  const {track: curTrack, playing} = useTypedSelector(state => state.player);
  const {fetchTracks, changeTrack, play, pause} = useActions();

  useEffect(() => {
    fetchTracks();
  }, [])

  const handleTrackClick = (track: ITrack) => {
    if (curTrack?.id !== track.id) {
      changeTrack(track);
    } else {
      playing ? pause() : play();
    }
  }

  return (
    <section className="track-list-wrapper px-6 grid gap-6 mb-8">
        <div id="trackList" className="grid grid-cols-6 gap-4">
        {
          tracks.length ?
          tracks.map(track => {
            return <Track
                      key={track.id}
                      isPlaying={curTrack?.id === track?.id && playing}
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
