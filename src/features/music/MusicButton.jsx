import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

const VOLUME = 0.2;

const GESTURES = [
  "pointerdown", "pointerup", "click", "keydown",
  "touchstart", "touchend", "scroll", "wheel",
];

const MusicButton = ({ src = "/music/tena.mp3" }) => {
  const audioRef = useRef(null);
  const pausedByUser = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;
    audio.volume = VOLUME;

    const removeGestures = () => {
      GESTURES.forEach((g) => window.removeEventListener(g, onGesture, true));
    };

    const onGesture = (e) => {
     
      if (pausedByUser.current) return;
     
      if (e.target?.closest?.("[data-music-button]")) return;
      
      audio.play()
        .then(removeGestures)
        .catch(() => {});
    };

   
    const tryPlay = audio.play();
    if (tryPlay && typeof tryPlay.then === "function") {
      tryPlay.catch(() => {
       
        GESTURES.forEach((g) =>
          window.addEventListener(g, onGesture, { capture: true, passive: true })
        );
      });
    }

    return () => {
      removeGestures();
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (audio.paused) {
        pausedByUser.current = false;
        await audio.play();
      } else {
        pausedByUser.current = true;
        audio.pause();
      }
      setError("");
    } catch {
      setError("Cannot play the music file.");
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {error && (
        <p className="fixed bottom-24 left-6 z-40 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 shadow">
          {error}
        </p>
      )}

      <button
        data-music-button
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className={`fixed bottom-6 left-6 z-40 grid size-12 place-items-center rounded-full bg-rose-600 text-white shadow-xl transition active:scale-95 ${
          playing ? "animate-pulse ring-4 ring-rose-200" : ""
        }`}
      >
        {playing ? <FaPause size={15} /> : <FaPlay size={15} className="translate-x-px" />}
      </button>
    </>
  );
};

export default MusicButton;