import React, { useState, useEffect, useContext } from "react";

import { useDispatchAuthenticatedGet } from "../modules/fetchAndDispatch";
import {
  restGetPlaylistsUrl,
  restGetVideosUrl,
  restUpdatePlaylistUrlBase,
  restUpdatePlaylistUrlFields
} from "../modules/settings";
import { putAuthenticated, getAuthenticated } from "../modules/fetch";
import { store } from "../modules/store.js";
import Navigation from "../components/Navigation";
import Video from "../components/Video";
export default function Playlist(props) {
  const { state, dispatch } = useContext(store);

  //Ideen er fed nok, men skal droppes, for meget bøvle med at jeg ikke kan sætte
  useDispatchAuthenticatedGet(restGetPlaylistsUrl, "setPlaylists");
  //useDispatchAuthenticatedGet(restGetVideosUrl, "setVideos");

  useEffect(() => {
    if (state.videos.length > 0) {
      return;
    }
    getAuthenticated(
      restGetVideosUrl,
      state.user.accessToken,
      data => {
        dispatch({
          type: "addToVideos",
          payload: data
        });
      },
      true
    );
  }, [dispatch, state.user.accessToken, state.videos.length]);

  const current = state.playlists.find(pl => pl.id === Number(props.id));
  if (!current || state.videos.length === 0) {
    return <div>Loading...</div>;
  }
  const comparisonArray = current.videos ? current.videos : [];
  const inPlaylist = state.videos.filter(vid =>
    comparisonArray.includes(vid.id)
  );
  const notInPlaylist = state.videos.filter(
    vid => !comparisonArray.includes(vid.id)
  );

  function addVideoToPlaylist(id) {
    putAuthenticated(
      restUpdatePlaylistUrlBase + props.id + restUpdatePlaylistUrlFields,
      state.user.accessToken,
      { videos: inPlaylist.map(vid => vid.id).concat(id) },
      data => {
        dispatch({
          type: "updatePlaylistVideos",
          payload: { id: Number(props.id), videos: data.videos }
        });
      }
    );
  }
  return (
    <>
      <Navigation />
      <main>
        <h1>Editing {current.title.rendered}</h1>
        <h2>Videos</h2>
        <div className="editPlaylistVideoWrapper">
          <section>
            <h3>In playlist</h3>
            {inPlaylist.map(vid => {
              return (
                <div key={vid.id}>
                  <Video
                    path={vid.path}
                    onAdd=""
                    onRemove=""
                    header={vid.title.rendered}
                    isOwner=""
                    inPlaylist=""
                    video_id={vid.id}
                  />
                  <button>Remove from playlist</button>
                </div>
              );
            })}
          </section>
          <section>
            <h3>Not in playlist</h3>
            {notInPlaylist.map(vid => {
              return (
                <div key={vid.id}>
                  <Video
                    key={vid.id}
                    path={vid.path}
                    onAdd=""
                    onRemove=""
                    header={vid.title.rendered}
                    isOwner=""
                    inPlaylist=""
                    video_id={vid.id}
                  />
                  <button onClick={() => addVideoToPlaylist(vid.id)}>
                    Add to playlist
                  </button>
                </div>
              );
            })}
          </section>
        </div>
      </main>
    </>
  );
}
