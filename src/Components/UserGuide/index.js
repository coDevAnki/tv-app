import { createPortal } from "react-dom";
import useClickOutside from "../../custom-hooks/useClickOutside";
import "./style.css";

const UserGuide = ({ setShowUserGuide }) => {
  const userGuideRef = useClickOutside(() => {
    setShowUserGuide(false);
  });

  return createPortal(
    <div className="modal_container">
      <div className="modal_inner" ref={userGuideRef}>
        <ul className="userguide_container">
          <li className="userguide_item">
            search for videos(youtube) feel the Television
          </li>
          <li className="userguide_item">drag and use remote</li>
          <li className="userguide_item">
            loop up each video with channel number
          </li>
        </ul>
        <button
          onClick={() => {
            setShowUserGuide(false);
          }}
        >
          Ok
        </button>
      </div>
    </div>,
    document.getElementById("userguide-modal")
  );
};

export default UserGuide;
