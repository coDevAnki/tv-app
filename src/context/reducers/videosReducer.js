import { GET_VIDEOS, SELECT_VIDEO } from "../actionTypes";

const videosReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_VIDEOS:
      return { ...state, videos: payload };

    case SELECT_VIDEO:
      return { ...state, selectedVideo: payload };
    default:
      return state;
  }
};

export default videosReducer;
