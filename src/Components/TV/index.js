import React, { useEffect, useRef } from "react";
import Remote from "../Remote"
import "./style.css";

const TV = () => {
  const tvRef = useRef();
  useEffect(() => {
    console.log(tvRef.current);
  });

  return (
  <>
    <div ref={tvRef} className="tv-container">
      <div
        id="youtubeplayer"
        style={{
          height: "92%",
          width: "calc(100% - 10px)",
          boxShadow: "inset 0px -3px 5px grey",
          padding: "5px",
        }}
      ></div>
      <div className="tv-deck"></div>
    </div>
    <Remote><div>remote</div></Remote>
    </>
  );
};
export default TV;
