import React, { useEffect, useRef, useState } from "react";
import { useVideosDispatch, useVideosState } from "../../context";
import { selectVideoAction } from "../../context/actions";
import useYoutubeScript from "../../custom-hooks/useYoutubeScript";
import Remote from "../Remote";
import "./style.css";

const TV = () => {
  const { videos, selectedVideo } = useVideosState();
  const videosDispatch = useVideosDispatch();
  const tvRef = useRef();
  const firstBootup = useRef(false);
  const selectedVideoId = selectedVideo?.id?.videoId;
  const player = useYoutubeScript({
    iframeId: "youtubeplayer",
    videoId: selectedVideoId,
  });

  const [isTvOff, setIsTvOff] = useState(false);
  const [tvInfo, setTvInfo] = useState();

  useEffect(() => {
    if (tvRef.current) {
      if (selectedVideoId) {
        tvRef.current.style.setProperty("--tv_light_color", "greenyellow");
      } else tvRef.current.style.setProperty("--tv_light_color", "red");
    }
  }, [selectedVideoId]);

  const changeTvInfo = (info) => {
    setTvInfo(info);
    console.log(tvInfo);
    let timer = setTimeout(() => {
      setTvInfo("");
      clearTimeout(timer);
    }, 6000);
  };

  useEffect(() => {
    if (player) {
      const onStateChange = () => {
        if (player) {
          if (player.getPlayerState() === 2) {
            if (!isTvOff) setIsTvOff(true);
          } else {
            setTimeout(() => {
              setIsTvOff(false);
            }, 1000);
          }
        }
      };
      player.addEventListener("onStateChange", onStateChange);
    }
  }, [player]);

  const tvOnOff = () => {
    if (!firstBootup.current) {
      selectVideoAction(videosDispatch)(videos[0]);
      changeTvInfo(1);
      firstBootup.current = true;
      return;
    }
    if (player.getPlayerState() === 1) {
      player.pauseVideo();
      tvRef.current.style.setProperty("--tv_light_color", "red");
    } else {
      player.playVideo();
      changeTvInfo(videos.indexOf(selectedVideo) + 1);
      tvRef.current.style.setProperty("--tv_light_color", "greenyellow");
    }
  };

  const selectChannel = (video, channelNo) => {
    selectVideoAction(videosDispatch)(video);
    changeTvInfo(channelNo);
  };

  const volUp = () => {
    if (firstBootup.current) {
      player.setVolume(player.getVolume() + 5);
      changeTvInfo({ vol: player.getVolume() / 5 });
    }
  };
  const volDown = () => {
    if (firstBootup.current) {
      player.setVolume(player.getVolume() - 5);
      changeTvInfo({ vol: player.getVolume() / 5 });
    }
  };
  const volMute = () => {
    if (firstBootup.current) {
      if (player.isMuted()) {
        player.unMute();
        changeTvInfo("Mute Off");
      } else {
        player.mute();
        changeTvInfo("Mute On");
      }
    }
  };
  const channelUp = () => {
    if (firstBootup.current) {
      let current = videos.findIndex(
        (video) => video.id.videoId === selectedVideoId
      );
      if (current === videos.length - 1) {
        selectVideoAction(videosDispatch)(videos[0]);
        changeTvInfo(1);
      } else {
        selectVideoAction(videosDispatch)(videos[current + 1]);
        changeTvInfo(current + 2);
      }
    }
  };

  const ChannelDown = () => {
    if (firstBootup.current) {
      let current = videos.findIndex(
        (video) => video.id.videoId === selectedVideoId
      );
      if (current === 0) {
        selectVideoAction(videosDispatch)(videos[videos.length - 1]);
        changeTvInfo(videos.length);
      } else {
        selectVideoAction(videosDispatch)(videos[current - 1]);
        changeTvInfo(current);
      }
    }
  };
  return (
    <div ref={tvRef} className="tv-container">
      <div id="youtubeplayer"></div>
      {isTvOff ? <div className="tv-overlay"></div> : null}
      {typeof tvInfo === "object" ? (
        <div className="volume-bars-container">
          {Array(+tvInfo.vol)
            .fill()
            .map((volBar) => (
              <div className="volume-bar"></div>
            ))}
        </div>
      ) : tvInfo ? (
        <div className="channel-info">{tvInfo}</div>
      ) : null}
      <div className="tv-light"></div>
      <div className="tv-deck"></div>
      {videos?.length ? (
        <Remote>
          <button onClick={tvOnOff}>&#9955;</button>
          <div></div>
          <button>&#xe5d0;</button>
          {videos?.map((video, index) => (
            <button onClick={() => selectChannel(video, index + 1)}>
              {index + 1}
            </button>
          ))}
          <button onClick={volUp}>+</button>
          <button onClick={channelUp}>&#8743;</button>
          <button onClick={volMute}>&#128263;</button>
          <button onClick={volDown}>-</button>
          <button onClick={ChannelDown}>&#8744;</button>
        </Remote>
      ) : null}
    </div>
  );
};
export default TV;
