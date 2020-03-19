import React from "react";
import { Link } from "@reach/router";

export default function Navigation() {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/all">All Videos</Link>
        <Link to="/playlists">Playlists</Link>
        <Link to="/debugger">Debugger</Link>
      </nav>
    </header>
  );
}
