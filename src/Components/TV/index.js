import React, { useEffect, useRef } from "react";
import { useVideosDispatch, useVideosState } from "../../context";
// import { selectVideoAction } from "../../context/actions";
import useYoutubeScript from "../../custom-hooks/useYoutubeScript";
import Remote from "../Remote";
import "./style.css";

const TV = () => {
  const { videos, selectedVideo } = useVideosState();
  const videosDispatch = useVideosDispatch();
  const tvRef = useRef();
  const someRef = useRef("The Ref");
  const selectedVideoId = selectedVideo?.id?.videoId;
  const player = useYoutubeScript("youtubeplayer", selectedVideoId);

  useEffect(() => {
    console.log(tvRef.current);
  });

  return (
    <>
      <div ref={tvRef} className="tv-container">
        <div
          id="youtubeplayer"
          style={{
            height: "92%",
            width: "calc(100% - 10px)",
            boxShadow: "inset 0px -3px 5px grey",
            padding: "5px",
          }}
        ></div>
        <div className="tv-deck"></div>
        <Remote>
          <button>1</button>
          <button>2</button>
          <button>3</button>
        </Remote>
      </div>
    </>
  );
};
export default TV;
