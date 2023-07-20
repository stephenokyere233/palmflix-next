/* eslint-disable react-hooks/exhaustive-deps */
import { AppContext } from "@/context";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useContext, useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const ImageSlider: FC<{
  images: string[];
  autoSlideDuration: number;
  data?: any;
}> = ({ images, autoSlideDuration, data }) => {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const handlePrevClick = () => {
    const newIndex = index === 0 ? images.length - 1 : index - 1;
    setIndex(newIndex);
  };

  const handleNextClick = () => {
    const newIndex = index === images.length - 1 ? 0 : index + 1;
    setIndex(newIndex);
  };

  const autoIncrement = () => {
    const newIndex = index === images.length - 1 ? 0 : index + 1;
    setIndex(newIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(autoIncrement, autoSlideDuration);
    return () => clearInterval(intervalId);
  }, [index]);

  const handleImageClick = (id: number, media_type: string) => {
    if (!id || !media_type) return;
    router.push(`/preview/${media_type}/${id}`);
  };

  return (
    <div className="relative my-10  bg-black overflow-hidden h-[700px] rounded-lg ">
      <Image
        onClick={() =>
          handleImageClick(
            data[index]?.id,
            data.hasOwnProperty("first_air_date") ? "tv" : "movie",
          )
        }
        src={images[index] ? images[index] : "/no_preview.jpg"}
        alt={`Image ${index + 1}`}
        className="w-full h-full object-cover transition-all duration-1000 delay-75 ease-in-out transform opacity-40 cursor-pointer"
        width={3000}
        height={3000}
      />

      <div className="mx-2 pl-20 absolute bottom-10 text-white">
        <h2 className="text-4xl font-bold ">{data && data[index]?.title}</h2>
        <p className="max-w-[600px]">{data && data[index]?.overview}</p>
      </div>
      <button
        className="absolute top-[50%] mx-2  text-white hover:bg-gray-400 hover:bg-opacity-20 h-24"
        onClick={handlePrevClick}
      >
        <MdKeyboardArrowLeft size={32} className="opactity-[100%]" />
      </button>
      <button
        className="absolute top-[50%] mx-2 right-0 text-white hover:bg-gray-400 hover:bg-opacity-20 h-24"
        onClick={handleNextClick}
      >
        <MdKeyboardArrowRight size={32} className="opactity-[100%]" />
      </button>
    </div>
  );
};

export default ImageSlider;
