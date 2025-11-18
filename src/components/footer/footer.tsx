import { XIcon } from "@/components/footer/icons";
import Link from "next/link";
import { Volume2, VolumeX } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const socialLinks = [
  {
    label: <XIcon className="h-6 w-6" />,
    href: "https://x.com/agentsakura_ai",
    title: "Follow us on X (Twitter)",
  },
];

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('/nostalgic-roblox-moon-animation.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = volume / 100;

    // Load saved volume from localStorage if available
    const savedVolume = localStorage.getItem('musicVolume');
    if (savedVolume) {
      const vol = parseInt(savedVolume);
      setVolume(vol);
      if (audioRef.current) {
        audioRef.current.volume = vol / 100;
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
    localStorage.setItem('musicVolume', newVolume.toString());
  };

  return (
    <div className="flex items-center gap-2">
      <button
        className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {/* {isPlaying ? (
          
        ) : (
          <VolumeX className="h-4 w-4" />
        )} */}
        <Volume2 className="h-4 w-4" />
        <span>Plage Coquillage (kiss song) Best Part Only</span>
      </button>
      {/* <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
        className="w-20 accent-foreground"
        aria-label="Volume control"
      /> */}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground">
              CEO and Co-founder of Sakura:{' '}
              <Link 
                href="https://x.com/ptbthefirst" 
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:underline"
              >
                Paul-Simon
              </Link>
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                title={link.title}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground space-y-2">
          <p> {new Date().getFullYear()} Sakura. All rights reserved.</p>
          <div className="flex justify-center">
            <MusicPlayer />
          </div>
        </div>
      </div>
    </footer>
  );
}
