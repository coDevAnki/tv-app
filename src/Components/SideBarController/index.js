import React, { useState } from "react";
import {
  useCustomizationDispatch,
  useCustomizationState,
  useVideosState,
} from "../../context";
import Sidebar from "../Sidebar";
import UserGuide from "../UserGuide";
import "./style.css";

const SidebarController = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { bgClr, bodyClr } = useCustomizationState();
  const customizationDispatch = useCustomizationDispatch();
  const { searchedTerm } = useVideosState();
  const openSidebar = () => {
    setShowSidebar(true);
  };
  const [showUserGuide, setShowUserGuide] = useState(false);
  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <>
      <div onClick={openSidebar} className="hamberger_icon">
        &#9776;
      </div>
      {searchedTerm ? null : (
        <header className="hero-container">
          <h1 className="hero-heading">WATCH YOUR FAVOURITE VIDEOS ON TV</h1>
          <button className="btn-cta" onClick={openSidebar}>
            Get Started
          </button>
        </header>
      )}
      {showSidebar ? (
        <Sidebar
          closeSidebar={closeSidebar}
          setShowUserGuide={setShowUserGuide}
        />
      ) : null}
      {showUserGuide ? <UserGuide setShowUserGuide={setShowUserGuide} /> : null}
    </>
  );
};

export default SidebarController;
