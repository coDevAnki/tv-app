import React from "react";
import { useVideosState } from "../../context";
import VideoItem from "../VideoItem";
import "./style.css";

const VideoList = () => {
  const { videos, selectedVideo } = useVideosState();
  return (
    <div className="channel-section-container">
      {videos?.length ? <div className="go-to-tv-icon" onClick={()=>scroll({top:0, behavior:"smooth"})}>&#128250;</div> : null}
      <div id="all-video-channels" className="video-list-container">
        {videos?.map((video, index) => (
          <div className="video-card-container">
            <VideoItem
              thisVideo={video}
              channel={index + 1}
              isSelected={video === selectedVideo}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
