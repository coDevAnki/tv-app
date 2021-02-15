import React from "react";
import VideosProvider from "../context";
import "./globalStyles.css";
import SearchBar from "./SearchBar";
import TV from "./TV";
import VideoList from "./videoList";

const App = () => {
  console.log(process.env.NODE_ENV);
  return (
    <VideosProvider>
      <SearchBar />
      <TV />
      {/* <VideoDetail
          video={selectedVideo}
          videos={videos}
          selectVideo={setSelectedVideo}
        /> */}

      <VideoList />
    </VideosProvider>
  );
};

export default App;
