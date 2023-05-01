import Image from 'next/image';
import React, { FC, useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa"

const TrailerSlider: FC<{ images: any[], autoSlideDuration: number, data?: any }> = ({ images, autoSlideDuration, data }) => {
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState<boolean>(true);

    const handlePrevClick = () => {
        const newIndex = index === 0 ? images.length - 1 : index - 1;
        setIndex(newIndex);
        // setIsPlaying(false);
    };

    const handleNextClick = () => {
        const newIndex = index === images.length - 1 ? 0 : index + 1;
        setIndex(newIndex);
        // setIsPlaying(false);
    };

    const videoRef = useRef<HTMLVideoElement>(null);

    function handlePlayPause() {
        const video = videoRef.current;
        if (isPlaying) {
            video?.pause();
            setIsPlaying(false);
        } else {
            video?.play();
            setIsPlaying(true);
            setIsMuted(false)
        }
    }
    const handleMuteToggle = () => {
        const video = videoRef.current;

        if (video) {
            video.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    useEffect(() => {

        const video = videoRef.current;
        if (video) {
            video.autoplay = true;
            video.muted = true;
            video.play();
        }
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5,
        };
        const callback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    videoRef.current?.play();
                } else {
                    videoRef.current?.pause();
                }
            });
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(videoRef.current!);
        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        }

    }, []);
 
    useEffect(() => {
        // const video = videoRef.current;

        // // Set autoplay and muted attributes to ensure the video plays automatically and without sound
        // if (video) {
        //     video.autoplay = true;
        // }

        // Pause the video if it goes out of the viewport
        // const handleScroll = () => {
        //     const rect = video?.getBoundingClientRect();
        //     const viewHeight = Math.max(
        //         document.documentElement.clientHeight,
        //         window.innerHeight
        //     );
        //     if (rect?.bottom! < 0 || rect?.top! - viewHeight >= 0) {
        //         video?.pause();
        //     } else {
        //         video?.play();
        //     }
        // };

        // window.addEventListener("load", () => {
        //     if (video) {
        //         video.play();
        //         window.addEventListener("scroll", handleScroll);
        //     }
        // });

        // return () => {
        //     window.removeEventListener("scroll", handleScroll);
        // };
    }, []);




    // const autoIncrement = () => {
    //     const newIndex = index === images.length - 1 ? 0 : index + 1;
    //     setIndex(newIndex);
    // };

    // useEffect(() => {
    //     const intervalId = setInterval(autoIncrement, autoSlideDuration);
    //     return () => clearInterval(intervalId);
    // }, [index]);

    return (
        <div className="relative  bg-black overflow-hidden w-screen h-[800px] ">
            <video muted={isMuted} ref={videoRef} src={images[index].video_link} className='w-full h-full object-cover transition-all duration-1000 delay-75 ease-in-out transform ' onEnded={handleNextClick} autoPlay={true}></video>
            <button className='absolute bg-red z-10 top-[50%] w-[100px] h-[100px] right-[50%] bg-gray-400 opacity-40 justify-center flex items-center p-4 rounded-full' onClick={handlePlayPause}>{isPlaying ? <FaPause size={32} /> : <FaPlay size={32} />}</button>
            <button className='absolute bg-brand rounded-full p-4 opacity-80 bottom-6 md:bottom-10 right-10' onClick={handleMuteToggle}>
                {isMuted ? <FaVolumeMute size={32} /> : <FaVolumeUp size={32} />}
            </button>
            <div className='mx-2 md:pl-20 absolute bottom-16 text-white'>
                <h2 className='text-4xl font-bold '>
                    {images[index].title}
                </h2>
                <p className='max-w-[600px]'>
                    {images[index].overview}
                </p>
            </div>
            <button className='absolute top-[50%] mx-2  text-white hover:bg-gray-400 hover:bg-opacity-20 h-24' onClick={handlePrevClick}><MdKeyboardArrowLeft size={32} className='opactity-[100%]' /></button>
            <button className='absolute top-[50%] mx-2 right-0 text-white hover:bg-gray-400 hover:bg-opacity-20 h-24' onClick={handleNextClick}><MdKeyboardArrowRight size={32} className='opactity-[100%]' /></button>
        </div>
    );
};

export default TrailerSlider;
