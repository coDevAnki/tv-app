import React, { useState } from "react";
import { useVideosState } from "../../context";
import hexToRGB from "../../helpers/hexToRGB";
import SearchBar from "../SearchBar";
import "./style.css";

const Sidebar = ({ closeSidebar }) => {
  const [clr1, setCLr1] = useState(
    getComputedStyle(document.body).getPropertyValue("--bg-clr").trim()
  );
  const [clr2, setCLr2] = useState(
    getComputedStyle(document.body).getPropertyValue("--body-clr").trim()
  );
  const { searchedTerm } = useVideosState();

  const customizeBgClr = (e) => {
    document.body.style.setProperty("--bg-clr", e.target.value);
    setCLr1(e.target.value);
  };
  const customizeBodyClr = (e) => {
    document.body.style.setProperty("--body-clr", e.target.value);
    document.body.style.setProperty(
      "--sidebar-clr",
      hexToRGB(e.target.value, 0.8)
    );
    setCLr2(e.target.value);
  };

  return (
    <div className="sidebar_container">
      <div onClick={closeSidebar} className="close_icon">
        &#9746;
      </div>
      <SearchBar />
      <div
        className={`nav_item_container${searchedTerm ? " channel_link" : ""}`}
      >
        {searchedTerm ? (
          <a
            className="nav_item"
            onClick={() =>
              scroll({
                top: document
                  .getElementById("all-video-channels")
                  .getBoundingClientRect().top,
                behavior: "smooth",
              })
            }
          >
            Channels for "{searchedTerm}" &#128071;
          </a>
        ) : (
          <label htmlFor="search_term_for_videos" className="nav_item">
            Search for Channels
          </label>
        )}
      </div>
      <nav>
        <div className="nav_item_container">
          <label className="nav_item" htmlFor="choose_clr1">
            Change Wall Color
          </label>
          <input
            onChange={customizeBgClr}
            value={clr1}
            id="choose_clr1"
            type="color"
          />
        </div>
        <div className="nav_item_container">
          <label className="nav_item" htmlFor="choose_clr2">
            Change Desk Color
          </label>
          <input
            onChange={customizeBodyClr}
            value={clr2}
            id="choose_clr2"
            type="color"
          />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
