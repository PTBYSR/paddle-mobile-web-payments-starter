'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Show tooltip after 2 seconds of component mount
  useEffect(() => {
    tooltipTimeoutRef.current = setTimeout(() => {
      setShowTooltip(true);
      
      // Auto-hide tooltip after 5 seconds
      tooltipTimeoutRef.current = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
    }, 2000);
    
    return () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
    };
  }, []);

  // Initialize audio when component mounts
  useEffect(() => {
    setIsMounted(true);
    audioRef.current = new Audio('/sakura-theme.mp3');
    audioRef.current.loop = true;
    
    // Set initial volume from localStorage or default to 50%
    const savedVolume = typeof window !== 'undefined' ? localStorage.getItem('musicVolume') : null;
    const initialVolume = savedVolume ? parseInt(savedVolume) : 50;
    setVolume(initialVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = initialVolume / 100;
    }

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (volumeTimeoutRef.current) {
        clearTimeout(volumeTimeoutRef.current);
      }
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
    };
  }, []);

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    // Save volume preference
    if (typeof window !== 'undefined') {
      localStorage.setItem('musicVolume', newVolume.toString());
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Autoplay with user interaction
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Error playing audio:', error);
        });
      }
    }
    setIsPlaying(!isPlaying);
  };

  // Don't render on server-side to prevent hydration issues
  if (typeof window === 'undefined' || !isMounted) {
    return null;
  }

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="h-5 w-5" />;
    return <Volume2 className="h-5 w-5" />;
  };

  const handleMouseEnter = () => {
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
    setShowVolumeSlider(true);
  };

  const handleMouseLeave = () => {
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeSlider(false);
    }, 1000);
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showTooltip && (
        <div className="bg-blue-500 text-white text-sm px-3 py-1.5 rounded-full mb-2 animate-bounce">
          Play me!
        </div>
      )}
      {showVolumeSlider && (
        <div className="mb-2 flex h-12 w-32 items-center justify-center rounded-lg bg-background/90 px-3 shadow-lg backdrop-blur-sm">
          <Slider
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="w-full"
            aria-label="Volume control"
          />
        </div>
      )}
      <div className="relative">
        <Button
          onClick={togglePlay}
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg hover:bg-accent/90 transition-all duration-300 hover:scale-105"
          aria-label={isPlaying ? "Mute background music" : "Play background music"}
        >
          {isPlaying ? getVolumeIcon() : <VolumeX className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
}
