import React, { useState } from "react";
import LazyLoad from "react-lazyload";

//import Button from "muicss/lib/react/button";

import { mediaUrl } from "../modules/settings";

export default function Video(props) {
  const [active, setActive] = useState(false);
  const imgName = props.path + ".jpg";
  if (!active) {
    return (
      <article className="video" onClick={() => setActive(true)}>
        <h2>{props.header}</h2>
        <div className="wrapper">
          <LazyLoad height={300}>
            {/* should use size from parent component */}
            <img src={`${mediaUrl}posters/${imgName}`} alt="" />
          </LazyLoad>
        </div>
      </article>
    );
  } else {
    return (
      <article className="video">
        <h2>{props.header}</h2>
        <video
          controls
          autoPlay={true}
          poster={`${mediaUrl}posters/${imgName}`}
        >
          <source
            src={`${mediaUrl}optimizedvids/${props.path + ".webm"}`}
            type="video/webm; codecs=vp9,vorbis"
          />
        </video>
        {!props.inPlaylist && props.isOwner && (
          <button
            color="primary"
            onClick={() => {
              props.onAdd(props.video_id);
            }}
          >
            Add to playlist
          </button>
        )}
        {props.inPlaylist && props.isOwner && (
          <button
            color="danger"
            onClick={() => {
              props.onRemove(props.video_id);
            }}
          >
            Remove from playlist
          </button>
        )}
      </article>
    );
  }
}
