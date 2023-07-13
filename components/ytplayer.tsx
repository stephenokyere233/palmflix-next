import React, { useState, useEffect } from 'react';
import { BiX } from 'react-icons/bi';

interface Props {
    videoId: string;
    onClose: () => void;
}

const YouTubePlayer: React.FC<Props> = ({videoId,onClose}) => {

    const handleContainerClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        onClose()
    };
   
    return (
        <div style={{ background: "rgba(169, 169, 169, 0.3)" }} className='overflow-hidden bg-red-300 absolute inset-0 w-full z-[30] h-screen flex justify-center items-center' onClick={handleContainerClick}>
            <BiX size={32} onClick={onClose} className='absolute right-10 cursor-pointer top-6'/>
            <div className='w-full  lg:w-[80%] h-[90%] rounded-lg'>
                <iframe className='w-full h-full object-cover rounded-lg' width="560" height="315" src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

            </div>
        </div>
    );
};

export default YouTubePlayer;
