import { useEffect, useState, useRef } from "react";
import songs from "../../lirics/HotlineBling.json";
import ReactPlayer from "react-player";

export const Music = () => {
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const lyricsEnglish = songs.lyricsEnglish;
  const lyricsSpanish = songs.lyricsSpanish;
  const lyricsSpaglish = songs.lyricsTransliterated;
  const durations = songs.lyricsDuration;
  const lyricRefsEnglish = useRef<(HTMLParagraphElement | null)[]>([]);
  const lyricRefsSpanish = useRef<(HTMLParagraphElement | null)[]>([]);
  const lyricRefsSpaglish = useRef<(HTMLParagraphElement | null)[]>([]);

  const updateLyricsIndex = (currentTime: number) => {
    for (let i = 0; i < durations.length; i++) {
      if (currentTime > durations[i] && currentTime < durations[i + 1]) {
        setCurrentLyricIndex(i);
        break;
      }
    }
  };

  useEffect(() => {
    lyricRefsEnglish.current[currentLyricIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    lyricRefsSpanish.current[currentLyricIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    lyricRefsSpaglish.current[currentLyricIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [currentLyricIndex]);

  return (
    <div className="h-screen w-full bg-gray-900 flex flex-col items-center justify-center text-white">
      {/* Player Section */}
      <div className="w-full max-w-7xl p-4 mt-5 flex justify-center items-center bg-gray-800 rounded-lg shadow-lg h-[35%]">
        {/* Song Info */}
        <div className="w-[30%] p-4 text-center text-yellow-300">
          <h2 className="text-2xl font-bold">{songs.infoSongs.title}</h2>
          <p className="text-lg mt-2">Artista: {songs.infoSongs.artist}</p>
          <p className="text-lg mt-1">Año: {songs.infoSongs.releaseYear}</p>
        </div>

        {/* Video Player */}
        <div className="w-[60%] h-full">
          <ReactPlayer
            url={`https://player.vimeo.com/video/${songs.infoSongs.idVimeo}`}
            playing={isPlaying}
            controls={true}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onProgress={({ playedSeconds }) => updateLyricsIndex(playedSeconds)}
            className="rounded-lg overflow-hidden"
            width="100%"
            height="100%"
          />
        </div>
        <div className="w-[20%]"></div>
      </div>

      {/* Lyrics Section */}
      <div className="flex flex-wrap justify-evenly w-full max-w-8xl gap-8 mt-6 overflow-hidden h-[65%]">
        {/* English Lyrics */}
        <div className="w-full md:w-[30%] bg-gray-800 bg-opacity-75 rounded-lg p-6 pt-2 flex flex-col items-center shadow-lg overflow-hidden max-h-[60vh] scroll-smooth">
          <h3 className="text-xl font-bold text-yellow-300 mb-1 sticky top-0 bg-gray-800 bg-opacity-100 w-full text-center py-2 z-10 rounded-t-lg shadow-md">
            English
          </h3>
          <div className="flex flex-col w-full">
            {lyricsEnglish.map((lyric, index) => (
              <p
                key={index}
                ref={(el) => (lyricRefsEnglish.current[index] = el)}
                className={`${
                  index === currentLyricIndex
                    ? "bg-yellow-300 text-black rounded-md shadow-md text-xl"
                    : "text-gray-300 opacity-80 text-xl"
                } transition-all duration-300`}
              >
                {lyric}
              </p>
            ))}
          </div>
        </div>

        {/* Spanglish Lyrics */}
        <div className="w-full md:w-[30%] bg-gray-800 bg-opacity-75 rounded-lg p-6 pt-2 flex flex-col items-center shadow-lg overflow-hidden max-h-[60vh] scroll-smooth">
          <h3 className="text-xl font-bold text-yellow-300 mb-1 sticky top-0 bg-gray-800 bg-opacity-100 w-full text-center py-2 z-10 rounded-t-lg shadow-md">
            Spanglish
          </h3>
          <div className="flex flex-col w-full">
            {lyricsSpaglish.map((lyric, index) => (
              <p
                key={index}
                ref={(el) => (lyricRefsSpaglish.current[index] = el)}
                className={`${
                  index === currentLyricIndex
                    ? "bg-yellow-300 text-black rounded-md shadow-md text-xl"
                    : "text-gray-300 opacity-80 text-xl"
                } transition-all duration-300`}
              >
                {lyric}
              </p>
            ))}
          </div>
        </div>

        {/* Spanish Lyrics */}
        <div className="w-full md:w-[30%] bg-gray-800 bg-opacity-75 rounded-lg p-6 pt-2 flex flex-col items-center shadow-lg overflow-hidden max-h-[60vh] scroll-smooth">
          <h3 className="text-xl font-bold text-yellow-300 mb-1 sticky top-0 bg-gray-800 bg-opacity-100 w-full text-center py-2 z-10 rounded-t-lg shadow-md">
            Español
          </h3>
          <div className="flex flex-col w-full">
            {lyricsSpanish.map((lyric, index) => (
              <p
                key={index}
                ref={(el) => (lyricRefsSpanish.current[index] = el)}
                className={`${
                  index === currentLyricIndex
                    ? "bg-yellow-300 text-black rounded-md shadow-md text-xl"
                    : "text-gray-300 opacity-80 text-xl"
                } transition-all duration-300`}
              >
                {lyric}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
