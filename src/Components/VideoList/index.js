import React from "react";
import { useVideosState } from "../../context";
import VideoItem from "../VideoItem";
import "./style.css";

const VideoList = () => {
  const { videos } = useVideosState();
  return (
    <div className="video-list-container">
      {videos?.map((video, index) => (
        <div className="video-card-container">
          <VideoItem thisVideo={video} channel={index + 1} />
        </div>
      ))}
    </div>
  );
};

export default VideoList;
