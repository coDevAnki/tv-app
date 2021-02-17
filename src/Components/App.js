import React,{useState} from "react";
import VideosProvider from "../context";
import "./globalStyles.css";
import SidebarController from "./SidebarController";
import TV from "./TV";
import VideoList from "./videoList";

const App = () => {
  return (
    <VideosProvider>
     <SidebarController/>
      <TV />
      <VideoList />
    </VideosProvider>
  );
};

export default App;
