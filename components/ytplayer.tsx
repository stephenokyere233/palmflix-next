import React, { useState, useEffect } from 'react';

interface Props {
    videoId: string;
    onClose: () => void;
}

const YouTubePlayer: React.FC<Props> = ({ videoId, onClose }) => {
    const [player, setPlayer] = useState<any>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(script);

        window.onYouTubeIframeAPIReady = () => {
            const player = new window.YT.Player('player', {
                videoId,
                playerVars: {
                    autoplay: 1,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                },
                events: {
                    onReady: () => {
                        setPlayer(player);
                    },
                    onStateChange: (event: any) => {
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            setIsPlaying(true);
                        } else if (event.data === window.YT.PlayerState.ENDED) {
                            setIsPlaying(false);
                            onClose();
                        }
                    },
                },
            });
        };
    }, [videoId, onClose]);

    const handleStop = () => {
        if (player) {
            player.stopVideo();
            onClose();
        }
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000 }}>
            <div id="player" style={{ width: '80%', height: '80%' }}></div>
            <button onClick={handleStop} style={{ position: 'absolute', top: 10, right: 10 }}>
                {isPlaying ? 'Close' : 'Close (Video Ended)'}
            </button>
        </div>
    );
};

export default YouTubePlayer;
