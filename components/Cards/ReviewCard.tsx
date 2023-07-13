import { IReview, Review } from "@/interfaces";
import formatDate from "@/utils/formatDate.util";
import React from "react";
import { FC } from "react";
import Image from "next/image";
import { BiUser } from "react-icons/bi";
import { firebaseAuth } from "@/config/firebase.config";
import { BiTrashAlt } from "react-icons/bi";

// const DBReviewCard: FC<any> = ({ author_details, content, created_at }) => {
//   return (
//     <div
//       className="rounded-lg p-4"
//       style={{ background: "rgba(169, 169, 169, 0.2)" }}
//     >
//       <div>
//         <div className="mb-4 flex items-center gap-4">
//           <div className="flex h-10 w-10 items-center justify-center rounded-full border">
//             <BiUser size={40} />
//           </div>
//           <h2 className="text-xl font-bold capitalize text-brand">
//             {author_details.username}
//           </h2>
//         </div>
//       </div>
//       <p className={content.length > 40 ? "max-lines-4" : ""}>{content}</p>
//       <span className="my-2 flex w-full justify-end  text-gray-300">
//         {formatDate(created_at)}
//       </span>
//     </div>
//   );
// };

const UserReviewCard: FC<any> = ({
  username,
  content,
  created_at,
  type,
  uid,
  id,
  removeReview,
}) => {
  return (
    <div
      onClick={() => console.log(id)}
      className="rounded-lg p-4 relative"
      style={{ background: "rgba(169, 169, 169, 0.2)" }}
    >
      <div>
        <div className="mb-4 flex items-center gap-4">
          <BiUser
            size={40}
            className="h-10 w-10 items-center justify-center rounded-full border"
          />
          <h2 className="text-xl font-bold capitalize text-brand">
            {username}
          </h2>
          {type === "user" && uid === firebaseAuth.currentUser?.uid && (
            <BiTrashAlt
              className="absolute top-4 text-red-400 right-4 cursor-pointer"
              onClick={removeReview}
              size={28}
            />
          )}
        </div>
      </div>
      <p className={content.length > 40 ? "max-lines-4" : ""}>{content}</p>
      <span className="my-2 flex w-full justify-end  text-gray-300">
        {formatDate(created_at)}
      </span>
    </div>
  );
};

export default UserReviewCard;
