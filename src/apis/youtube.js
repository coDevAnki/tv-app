import axios from "axios";
const KEY = process.env.YOUTUBE_API_KEY;
export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: { key: KEY },
});
