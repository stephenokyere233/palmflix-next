/* eslint-disable react-hooks/exhaustive-deps */
import { AppContext } from "@/context";
import React, { useContext } from "react";
import { firebaseAuth, firestoreDB } from "@/config/firebase.config";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import ModalLayout from "../layout/ModalLayout";
import { BiX } from "react-icons/bi";
import { setDoc, doc } from "firebase/firestore";
import { BiCopy } from "react-icons/bi";

const ShareModal = () => {
  const [url, setUrl] = React.useState<string>(window.location.href);
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  console.log(router)
  console.log(window.location.href)

  const { selectedMovieID, setShowShareModal } = useContext(AppContext);

  //   const addReview = async (movieID: string) => {
  //     if (comment==="") {
  //        toast.error("fill the form");
  //        return;
  //     }
  //     let newReview = {
  //       movieID,
  //       username: firebaseAuth.currentUser?.displayName,
  //       email: firebaseAuth.currentUser?.email,
  //       image: firebaseAuth.currentUser?.photoURL,
  //       uid: firebaseAuth.currentUser?.uid,
  //       content: comment,
  //       created_at: Date.now(),
  //       id:`${movieID}-${Date.now()}`,
  //       type:"user"
  //     };

  //     let docRef = `user_reviews/${newReview.id}`;
  //     console.log("newReview", newReview);

  //     const toastId = toast.loading("Loading...");
  //     await setDoc(doc(firestoreDB, docRef), newReview)
  //       .then(() => {
  //         toast.success("Added new review");
  //         toast.dismiss(toastId);
  //         setShowReviewModal(false)
  //       })
  //       .catch(() => {
  //         toast.error("Error occured adding bookmark");
  //       });
  //     console.log("add review");
  //     console.log("id", selectedMovieID);
  //   };

  return (
    <ModalLayout onHideModal={() => setShowShareModal(false)}>
      <section className=" flex w-full min-w-[350px] flex-col items-center justify-center gap-4 p-2 ">
        <BiX
          className="absolute right-10 top-6 cursor-pointer"
          onClick={() => setShowShareModal(false)}
          size={28}
        />
        <h1 className="text-2xl uppercase">Share with friends</h1>
        <div className="flex w-full flex-col pb-2">
          <label htmlFor="password">Review</label>
          <div className="flex items-center gap-4 justify-between">
            <input
              name="comment"
              value={url}
              className="rounded-md border bg-transparent p-2 outline-none cursor-text flex-1"
              disabled
            />
            <p
              style={{ background: "rgba(169, 169, 169, 0.2)" }}
              className="flex gap-2 cursor-pointer p-2 rounded-md"
            >
              <span>Copy</span>
              <BiCopy size={24} />
            </p>
          </div>
        </div>

        <button
          style={{ background: "rgba(169, 169, 169, 0.2)" }}
          className="flex w-full items-center justify-center gap-2 rounded-md  p-2 text-center"
        >
          {loading ? "Loading..." : "Submit Review"}
        </button>
      </section>
    </ModalLayout>
  );
};

export default ShareModal;
