import formatDate from "@/utils/formatDate.util";
import React from "react";
import { FC } from "react";
import { BiUser } from "react-icons/bi";
import { firebaseAuth } from "@/config/firebase.config";
import { BiTrashAlt } from "react-icons/bi";
import { motion } from "framer-motion";

const UserReviewCard: FC<any> = ({
  username,
  content,
  created_at,
  type,
  uid,
  rating,
  id,
  removeReview,
}) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="rounded-lg p-4 relative min-[400px] m-4"
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
      <p
        dangerouslySetInnerHTML={{ __html: content }}
        className={content.length > 35 ? "max-lines-4 mb-2" : "mb-2"}
      />
      <span>Rating: {rating}/10</span>
      <span className="my-2 flex w-full justify-end  text-gray-300">
        {formatDate(created_at)}
      </span>
    </motion.div>
  );
};

export default UserReviewCard;
