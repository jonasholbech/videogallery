import React, { useState, useEffect, useContext } from "react";
import { Link } from "@reach/router";
import {
  getAuthenticated,
  postAuthenticated,
  deleteAuthenticated
} from "../modules/fetch";
import { restGetPlaylistsUrl, restPostPlaylistUrl } from "../modules/settings";
import { store } from "../modules/store.js";
import Navigation from "../components/Navigation";
export default function Playlists(props) {
  //TODO: ref to playlists in WP, who can watch
  //TODO: lige nu henter den hver gang man besøger siden, kunne det ske en gang?
  const { state, dispatch } = useContext(store);

  const [playlistName, setPlaylistName] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  useEffect(() => {
    getAuthenticated(restGetPlaylistsUrl, state.user.accessToken, data => {
      dispatch({
        type: "setPlaylists",
        payload: data
      });
    });
  }, [dispatch, state.user.accessToken]);
  function formSubmit(e) {
    e.preventDefault();
    setButtonDisabled(true);
    postAuthenticated(
      restPostPlaylistUrl,
      state.user.accessToken,
      {
        status: "publish",
        title: playlistName,
        content: "",
        videos: []
      },
      data => {
        setButtonDisabled(false);
        setPlaylistName("");
        dispatch({
          type: "addPlaylist",
          payload: data
        });
      }
    );
  }
  function deletePlaylist(id) {
    deleteAuthenticated(
      restPostPlaylistUrl + id,
      state.user.accessToken,
      data => {
        dispatch({
          type: "removePlaylist",
          payload: id
        });
      }
    );
  }
  return (
    <>
      <Navigation />
      <main>
        <h1>Playlists</h1>
        <form onSubmit={formSubmit}>
          <h2>Add new playlist</h2>
          <input
            type="text"
            name="playlistname"
            value={playlistName}
            onChange={e => {
              setPlaylistName(e.target.value);
              setButtonDisabled(e.target.value.length < 3);
            }}
          />
          <input type="submit" disabled={buttonDisabled} value="Save" />
        </form>
        <ul>
          {state.playlists.map(pl => {
            return (
              <li key={pl.id}>
                {pl.title.rendered}
                <Link to={"/playlist/" + pl.id}>Edit</Link>
                <button onClick={() => deletePlaylist(pl.id)}>Delete</button>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
