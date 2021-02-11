import React from "react";
import TV from "./TV";
import SearchBar from "./SearchBar";
import VideosProvider from "../context";
import "./globalStyles.css";

const App = () => {
  console.log(process.env.NODE_ENV);
  return (<VideosProvider>
  <SearchBar/>
          <TV />
          </VideosProvider>)
};

export default App;
