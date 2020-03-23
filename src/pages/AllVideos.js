import React, { useEffect, useContext } from "react";
import { store } from "../modules/store.js";
import { getAuthenticated, putAuthenticated } from "../modules/fetch";
import {
  restGetVideosUrl,
  restGetPlaylistsUrl,
  restUpdateVideoUrlBase,
  restUpdateVideoUrlFields
} from "../modules/settings";
import Navigation from "../components/Navigation";
import Video from "../components/Video";

export default function AllVideos(props) {
  const { state, dispatch } = useContext(store);
  useEffect(() => {
    if (state.videos.length > 0) {
      return;
    }
    getAuthenticated(
      restGetVideosUrl,
      data => {
        dispatch({
          type: "addToVideos",
          payload: data
        });
      },
      true
    );
  }, [dispatch, state.videos.length]);
  useEffect(() => {
    if (state.playlists.length > 0) {
      return;
    }
    getAuthenticated(restGetPlaylistsUrl, data => {
      dispatch({
        type: "setPlaylists",
        payload: data
      });
    });
  }, [dispatch, state.playlists.length]);

  return (
    <>
      <Navigation />
      <main className="AllVideos">
        <h1>All videos</h1>
        {state.videos.map(vid => {
          return (
            <article className="videoContainer" key={vid.id}>
              <Video
                path={vid.path}
                onAdd=""
                onRemove=""
                header={vid.title.rendered}
                isOwner=""
                inPlaylist=""
                video_id={vid.id}
              />
              <ShowPlaylistsForVideo
                key={"form_" + vid.id}
                video={vid}
                playlists={state.playlists}
              />
            </article>
          );
        })}
      </main>
    </>
  );
}

function ShowPlaylistsForVideo({ video, playlists }) {
  const { dispatch } = useContext(store);
  return (
    <form>
      <ul>
        {playlists.map((pl, index) => {
          return (
            <li key={"form_li_" + index + "_" + video.id}>
              <label>
                {pl.title.rendered}
                <input
                  type="checkbox"
                  onChange={e => {
                    let playlists = video.playlists || [];
                    if (e.target.checked) {
                      playlists.push(pl.id);
                    } else {
                      playlists = playlists.filter(id => id !== pl.id);
                    }

                    putAuthenticated(
                      restUpdateVideoUrlBase +
                        video.id +
                        restUpdateVideoUrlFields,
                      { playlists: playlists },
                      data => {
                        dispatch({
                          type: "updateVideoPlaylists",
                          payload: { id: video.id, playlists: playlists }
                        });
                        console.log(data);
                      }
                    );
                  }}
                  checked={video.playlists && video.playlists.includes(pl.id)}
                />
              </label>
            </li>
          );
        })}
      </ul>
    </form>
  );
}
