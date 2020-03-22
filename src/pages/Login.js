import React, { useState, useContext } from "react";
import { navigate } from "@reach/router";

import { store } from "../modules/store.js";
import { post } from "../modules/fetch";
import { url } from "../modules/settings";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const { state, dispatch } = useContext(store);

  function submit(e) {
    e.preventDefault();
    post(
      `${url}api-bearer-auth/v1/login/`,

      {
        username,
        password
      },
      data => {
        if (data.access_token) {
          //TODO: store user level in state as well, wp_user.caps.administrator=true

          const exp = new Date().getTime() / 1000 + data.expires_in;
          dispatch({
            type: "login",
            payload: {
              loggedIn: true,
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
              exp: exp,
              displayName: data.wp_user.data.display_name
            }
          });
          localStorage.setItem("accessToken", data.access_token);
          localStorage.setItem("exp", exp);
          localStorage.setItem("refreshToken", data.refresh_token);
          localStorage.setItem("displayName", data.wp_user.data.display_name);
          navigate("/");
        } else {
          setErrorMessage(data.message);
          //throw new Error("HANDLE ME");
        }
      }
    );
  }
  /*
"wp_user": {
        "data": {
            "ID": "1",
            "user_login": "holbech",
            "user_pass": "$P$BYkdHGmTfL0Qpq5xyio1NnRpc.euhf/",
            "user_nicename": "holbech",
            "user_email": "jh@jonasholbech.dk",
            "user_url": "",
            "user_registered": "2020-03-16 23:20:02",
            "user_activation_key": "",
            "user_status": "0",
            "display_name": "holbech"
        },
*/
  return (
    <form onSubmit={submit}>
      <input
        type="text"
        name="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button>Log Ind</button>
      {errorMessage}
    </form>
  );
}
