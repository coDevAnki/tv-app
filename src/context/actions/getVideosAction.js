import youtube from "../../apis/youtube";
import { GET_VIDEOS } from "../actionTypes";

const getVideosAction = (dispatch) => async (searchTerm) => {
  const response = await youtube.get("/search", {
    params: { part: "snippet", maxResults: 9, q: searchTerm },
  });
  const videos = response?.data?.items;
  console.log(videos);

  dispatch({ type: GET_VIDEOS, payload: videos });
};

export default getVideosAction;
