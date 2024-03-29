/* eslint-disable react-hooks/exhaustive-deps */
import { AppContext } from "@/context";
import React, { useContext } from "react";
import { firebaseAuth, firestoreDB } from "@/config/firebase.config";
import { toast } from "react-hot-toast";
import ModalLayout from "../layout/ModalLayout";
import { BiX } from "react-icons/bi";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import useFetchUserReviews from "@/hooks/useUserReviews";

const ReviewModal = () => {
  const router = useRouter();
  const [comment, setComment] = React.useState<string>("");

  const [loading, setLoading] = React.useState<boolean>(false);
  const [rating, setRating] = React.useState<string>("");
  const { movieID } = router.query;
   const { reviews, fetchReviews } = useFetchUserReviews();

  const { setShowReviewModal } = useContext(AppContext);

  const addReview = async (movieID: string) => {
    if (!movieID) return;
    if (comment === "") {
      toast.error("fill the form");
      return;
    }
    let newReview = {
      movieID,
      rating,
      username: firebaseAuth.currentUser?.displayName,
      email: firebaseAuth.currentUser?.email,
      image: firebaseAuth.currentUser?.photoURL,
      uid: firebaseAuth.currentUser?.uid,
      content: comment,
      created_at: Date.now(),
      id: `${movieID}-${Date.now()}`,
      type: "user",
    };

    let docRef = `user_reviews/${newReview.id}`;
    setLoading(true);
    const toastId = toast.loading("Loading...");
    await setDoc(doc(firestoreDB, docRef), newReview)
      .then(() => {
        toast.success("Added new review");
        toast.dismiss(toastId);
        setLoading(false);
        fetchReviews()
        setShowReviewModal(false);
      })
      .catch(() => {
        toast.dismiss(toastId);
        toast.error("Error occured adding bookmark");
        setLoading(false);
      });
  };

  return (
    <ModalLayout onHideModal={() => setShowReviewModal(false)}>
      <section className=" flex w-full min-w-[350px] flex-col items-center justify-center gap-4 p-2 ">
        <BiX
          className="absolute right-10 top-6 cursor-pointer"
          onClick={() => setShowReviewModal(false)}
          size={28}
        />
        <h1 className="text-2xl uppercase">Submit Review</h1>
        <div className="flex w-full flex-col pb-2">
          <label htmlFor="password">Rating</label>
          <input
            name="rating"
            value={rating}
            maxLength={2}
            type="text"
            max={10}
            min={0}
            placeholder="Rate this movie out of 10"
            className="rounded-md border bg-transparent p-2 outline-none"
            onChange={(event) => {
              setRating(event.target.value);
            }}
          />
        </div>
        <div className="flex w-full flex-col pb-2">
          <label htmlFor="password">Review</label>
          <textarea
            name="comment"
            rows={8}
            value={comment}
            className="rounded-md border bg-transparent p-2 outline-none"
            onChange={(event) => {
              setComment(event.target.value);
            }}
          ></textarea>
        </div>
        <button
          style={{ background: "rgba(169, 169, 169, 0.2)" }}
          className="flex w-full items-center justify-center gap-2 rounded-md  p-2 text-center"
          onClick={() => addReview(movieID as string)}
        >
          {loading ? "Loading..." : "Submit Review"}
        </button>
      </section>
    </ModalLayout>
  );
};

export default ReviewModal;
