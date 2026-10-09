'use client';

import { useState } from 'react';
import PlayDot from './PlayDot';

/**
 * Lightweight YouTube embed: shows a cover until clicked, then loads the
 * privacy-enhanced player. (Videos without a youtube_id never reach the public site.)
 */
export default function VideoPlayer({ youtubeId, title }) {
  const [playing, setPlaying] = useState(false);

  if (playing && youtubeId) {
    return (
      <div className="player">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="player">
      <button
        type="button"
        className="player-cover"
        onClick={() => setPlaying(true)}
        disabled={!youtubeId}
        aria-label={`Play video: ${title}`}
        style={
          youtubeId
            ? {
                backgroundImage: `linear-gradient(rgba(14,21,32,.25), rgba(14,21,32,.25)), url(https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
      >
        <PlayDot size={24} />
      </button>
    </div>
  );
}
