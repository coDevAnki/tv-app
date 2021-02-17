import { useEffect, useRef, useState } from "react";

const useYoutubeScript = ({
  iframeId,
  videoId,
  onStateChange,
  watchList = [videoId],
}) => {
  const [player, setPlayer] = useState();
  const scriptOnceMade = useRef(false);

  useEffect(() => {
    console.log("a", videoId);
    if (videoId && !scriptOnceMade.current) {
      console.log("b");
      var tag = document.createElement("script");
      var firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      tag.src = "https://www.youtube.com/iframe_api";

      window.onYouTubeIframeAPIReady = function () {
        let ytPlayer = new window.YT.Player(iframeId, {
          videoId,
          playerVars: {
            controls: 0,
            autoplay: 1,
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });

        function onPlayerStateChange(event) {
          if (onStateChange) {
            onStateChange(event);
          }
        }
        function onPlayerReady(event) {
          setPlayer(ytPlayer);
          console.log(event.target);
          event.target.playVideo();
        }
      };
      scriptOnceMade.current = true;
    } else if (videoId) {
      player.loadVideoById(videoId);
    }
  }, watchList);

  return player;
};

export default useYoutubeScript;
