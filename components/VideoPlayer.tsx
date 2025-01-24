import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(progress);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full"
          src={src}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white" />
              )}
            </button>
            
            <button
              onClick={toggleMute}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6 text-white" />
              ) : (
                <Volume2 className="w-6 h-6 text-white" />
              )}
            </button>
            
            <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;