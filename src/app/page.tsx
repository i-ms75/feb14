"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';

// TypeScript declaration for the YouTube Player API
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export default function Home() {
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 'auto', left: 'auto', position: 'relative' as 'relative' | 'absolute' });
  const [videoVisible, setVideoVisible] = useState(false);
  const playerRef = useRef<any>(null);
  const videoId = "nzSonJ9zkAQ";

  useEffect(() => {
    // Function to initialize the player
    const createPlayer = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '390',
        width: '640',
        videoId: videoId,
        playerVars: {
            playsinline: 1, // Important for mobile browsers
            // mute: 1 // Autoplay is often only allowed when muted - User requested unmuted
        },
      });
    };

    // The API will call this function when it's ready
    window.onYouTubeIframeAPIReady = () => {
        if (window.YT) {
            createPlayer();
        }
    };

    // If the API is already loaded, create the player directly
    if (window.YT && window.YT.Player) {
      createPlayer();
    }

  }, [videoId]);

  const handleNoMouseOver = () => {
    const viewportWidth = window.innerWidth - 150;
    const viewportHeight = window.innerHeight - 150;
    const newTop = Math.random() * viewportHeight;
    const newLeft = Math.random() * viewportWidth;
    setNoButtonPosition({
      top: `${newTop}px`,
      left: `${newLeft}px`,
      position: 'absolute',
    });
  };

  const handleYesClick = () => {
    setVideoVisible(true);
    // If the player is ready, play the video
    if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      playerRef.current.playVideo();
    }
  };

  return (
    <main className={styles.main}>
        <h1 className={styles.question}>Do you like me?</h1>
        <div className={styles.buttons}>
          <button className={styles.yesBtn} onClick={handleYesClick} disabled={videoVisible}>
            Yes
          </button>
          {!videoVisible && (
            <button
              className={styles.noBtn}
              style={{
                position: noButtonPosition.position,
                top: noButtonPosition.top,
                left: noButtonPosition.left,
              }}
              onMouseOver={handleNoMouseOver}
            >
              No
            </button>
          )}
        </div>

        <div className={`${styles.videoContainer} ${videoVisible ? styles.videoVisible : ''}`}>
            {/* This div is the target for the YouTube API to inject the iframe */}
            <div id="youtube-player"></div>
        </div>
    </main>
  );
}