import React, { useEffect, useContext } from "react";
import { store } from "../modules/store.js";
import { getAuthenticated } from "../modules/fetch";
import { restGetVideosUrl } from "../modules/settings";
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
  return (
    <>
      <Navigation />
      <main className="AllVideos">
        <h1>All videos</h1>
        {state.videos.map(vid => {
          return (
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
          );
        })}
      </main>
    </>
  );
}
