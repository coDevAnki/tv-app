import { useEffect, useRef, useState } from "react";

const useYoutubeScript = (iframeId, videoId, watchList = [videoId]) => {
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
            autoplay: true,
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
        console.log("c");
        function onPlayerStateChange(event) {}
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
