import { GET_VIDEOS, SELECT_VIDEO, SET_SEARCHED_TERM } from "../actionTypes";

const videosReducer = (state, { type, payload }) => {
  switch (type) {

    case GET_VIDEOS:
      return { ...state, videos: payload };

    case SELECT_VIDEO:
      return { ...state, selectedVideo: payload };

    case SET_SEARCHED_TERM:
      return {...state, searchedTerm:payload};
    
    default:
      return state;
  }
};

export default videosReducer;
