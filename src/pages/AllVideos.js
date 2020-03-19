import React, { useEffect, useContext } from "react";
import { store } from "../modules/store.js";
import { getAuthenticated } from "../modules/fetch";
import { restUrl } from "../modules/settings";
import Navigation from "../components/Navigation";
import Video from "../components/Video";

export default function AllVideos(props) {
  const { state, dispatch } = useContext(store);
  useEffect(() => {
    //TODO, I only get the first 10 (multiple pages)
    getAuthenticated(
      `${restUrl}videos?_fields=id,title.rendered,content.rendered,path&per_page=10`,
      state.user.accessToken,
      data => {
        dispatch({
          type: "setVideos",
          payload: data
        });
      }
    );
  }, [dispatch, state.user.accessToken]);
  return (
    <>
      <Navigation />
      <main>
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
