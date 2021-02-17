import React, { useRef } from "react";
import "./style.css";

const Remote = ({ children }) => {
  const remoteRef = useRef();
  const remotePosRef = useRef();

  const dragRemote = (e) => {
    remoteRef.current.style.top = e.pageY - 100 + "px";
    remoteRef.current.style.left = e.pageX - 120 + "px";
  };
  const initDrag = (e) => {
    if (remoteRef.current) {
      remoteRef.current.addEventListener("mousemove", dragRemote);
      document.addEventListener("mouseup", () => {
        remoteRef.current.removeEventListener("mousemove", dragRemote);
      });
    }
  };
  return (
    <div ref={remoteRef} onMouseDown={initDrag} className="remote-container">
      {children}
    </div>
  );
};

export default Remote;
