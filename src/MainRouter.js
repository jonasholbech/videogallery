import React, { useContext, useEffect } from "react";
import { Router } from "@reach/router";
import { store } from "./modules/store.js";
import { post } from "./modules/fetch";
import { url } from "./modules/settings";
import AllVideos from "./pages/AllVideos";
import Login from "./pages/Login";
import Playlists from "./pages/Playlists";
import Playlist from "./pages/Playlist";

import Debugger from "./components/Debugger";
import Dashboard from "./pages/Dashboard";
function PrivateRoute(props) {
  const { state } = useContext(store);

  if (!state.user.loggedIn) {
    return <Login />;
  }
  let { as: Comp } = props;
  return state.user.loggedIn ? <Comp {...props} /> : <Login />;
}
function LoggedIn(props) {
  const { state } = useContext(store);
  if (!state.user.loggedIn) {
    return <Login />;
  }
  return props.children;
}
export default function MainRouter() {
  const { state, dispatch } = useContext(store);
  useEffect(() => {
    if (localStorage.getItem("accessToken") && state.user.loggedIn === false) {
      post(
        `${url}api-bearer-auth/v1/tokens/refresh/`,
        { token: localStorage.getItem("refreshToken") },
        data => {
          const exp = new Date().getTime() / 1000 + data.expires_in;
          dispatch({
            type: "login",
            payload: {
              loggedIn: true,
              accessToken: data.access_token,
              refreshToken: localStorage.getItem("refreshToken"),
              exp: exp,
              displayName: localStorage.getItem("displayName")
            }
          });
          localStorage.setItem("accessToken", data.access_token);
          localStorage.setItem("exp", data.expires_in);
        }
      );
    }
  }, [dispatch, state.user.loggedIn]);
  return (
    <div id="wrapper">
      <Router>
        <Login path="login" />
        <LoggedIn path="/">
          <Playlist path="playlist/:id" />
          <Dashboard path="/" />
          <Debugger path="debugger" />
          <AllVideos path="all" />
          <Playlists path="playlists" />
        </LoggedIn>
      </Router>
    </div>
  );
}
/*
<PrivateRoute as={Navigation} path="/" />
      <PrivateRoute as={Dashboard} path="/" />
      <PrivateRoute as={Debugger} path="debugger" />
      <PrivateRoute as={AllVideos} path="all" />
*/
