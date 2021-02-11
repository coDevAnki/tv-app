import React, { createContext, useContext, useReducer } from "react";
import { videosReducer } from "./reducers";
const initialVideos = { videos: [], selectedVideo: null };

const VideosStateContext = createContext();
const VideosDispatchContext = createContext();

const VideosProvider = ({ children }) => {
  const [videosState, videosDispatch] = useReducer(
    videosReducer,
    initialVideos
  );
  return (
    <VideosStateContext.Provider value={videosState}>
      <VideosDispatchContext.Provider value={videosDispatch}>
        {children}
      </VideosDispatchContext.Provider>
    </VideosStateContext.Provider>
  );
};
export const useVideosState = () => {
  return useContext(VideosStateContext);
};
export const useVideosDispatch = () => {
  return useContext(VideosDispatchContext);
};

export default VideosProvider;
