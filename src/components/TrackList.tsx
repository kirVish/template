import { FC, useEffect } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { CUR_TAB, ITrack } from '../interfaces';
import { EmptySearch } from './EmptySearch';
import { Track } from './Track';

interface IProps {
  curTab: CUR_TAB;
}


/**
* @author
* @function @TrackList
**/

export const TrackList:FC<IProps> = ({curTab}) => {

  const {tracks} = useTypedSelector(state => state.tracks);
  const {track: curTrack, playing} = useTypedSelector(state => state.player);
  const {fetchTopTracks, resetTracks, changeTrack, play, pause} = useActions();

  useEffect(() => {
    if (curTab === CUR_TAB.MAIN) {
      fetchTopTracks();
    } else {
      resetTracks();
    }
  }, [curTab])

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
          }) : <></>
        }
        </div>
        { !tracks.length && curTab === CUR_TAB.SEARCH ? <EmptySearch /> : <></> }
    </section>
   )
 }
