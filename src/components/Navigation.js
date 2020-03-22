import React from "react";
import { Link, navigate } from "@reach/router";

export default function Navigation() {
  function logOut() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("displayName");
    localStorage.removeItem("exp");
    navigate("/login");
  }
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/all">All Videos</Link>
        <Link to="/playlists">Playlists</Link>
        <Link to="/debugger">Debugger</Link>
        <button onClick={logOut}>Log out</button>
      </nav>
    </header>
  );
}
