import { img_path } from "@/constants/endpoints";
import Image from "next/image";
import React from "react";

type castProps = {
  castInfo: any;
};

const CastCard: React.FC<castProps> = ({ castInfo }) => {
  return (
    <div
      style={{ background: "rgba(169, 169, 169, 0.2)" }}
      className="max-w-[350px] rounded-md  p-2 cursor-pointer "
    >
      <Image
        src={
          castInfo.profile_path
            ? img_path + castInfo.profile_path
            : "/no_preview.jpg"
        }
        alt={castInfo.name}
        height={200}
        width={200}
        className="object-cover h-[300px] w-[250px]"
      />
      <p>{castInfo.name}</p>
      <p>As {castInfo.character}</p>
    </div>
  );
};

export default CastCard;
