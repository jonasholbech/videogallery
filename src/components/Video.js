import React, { useState } from "react";
import LazyLoad from "react-lazyload";
import Modal from "./Modal";
//import Button from "muicss/lib/react/button";

import { mediaUrl } from "../modules/settings";

export default function Video(props) {
  const [active, setActive] = useState(false);
  const imgName = props.path + ".jpg";
  function closeModal(e) {
    setActive(false);
  }
  if (!active) {
    return (
      <article className="video" onClick={() => setActive(true)}>
        <h4>{props.header}</h4>
        <div className="wrapper">
          <LazyLoad height={300}>
            {/* should use size from parent component */}
            <img
              className="center-cropped"
              src={`${mediaUrl}posters/${imgName}`}
              alt=""
            />
          </LazyLoad>
        </div>
      </article>
    );
  } else {
    return (
      <article className="video">
        <Modal>
          <div onClick={closeModal}>
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
          </div>
        </Modal>
      </article>
    );
  }
}
