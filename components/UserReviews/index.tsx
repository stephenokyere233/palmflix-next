// import { firestoreDB } from "@/config/firebase.config";
// import { AppContext } from "@/context";
// import { IReview } from "@/interfaces";
// import { User } from "firebase/auth";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import React, { useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import ReviewCard from "../Cards/ReviewCard";

// interface Review {
//   username: string;
//   created_at: string;
//   image: string | null;
//   content: string;
//   movieID: string;
//   uid: string;
//   email: string;
// }
// const UserReview = () => {
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const { selectedMovieID } = useContext(AppContext);
//   const [loading, setLoading] = useState<boolean>(false);

//   const getUserReviews = async () => {
//     const reviews_: Review[] = [];
//     let collectionRef = collection(firestoreDB, "user_reviews");
//     let q = query(collectionRef, where("movieID", ">=", selectedMovieID));

//     getDocs(q)
//       .then((result) => {
//         result.docs.forEach((doc) => {
//           reviews_.push(doc.data() as Review);
//         });
//         setReviews(
//           reviews_.filter((review) => review.movieID === selectedMovieID),
//         );
//         console.log("user reviews", reviews_);
//         setLoading(false);
//       })
//       .catch((error) => {
//         toast.error(error.message);
//         setLoading(false);
//       });
//   };
//   useEffect(() => {
//     getUserReviews();
//   }, []);
//   return (
//     <div className="grid gap-10 md:grid-cols-2">
//       {reviews
//         .filter((review) => review.movieID === selectedMovieID)
//         .map((review: Review) => {
//           const { username, created_at, image, content, movieID } = review;
//           return (
//             <ReviewCard
//               key={created_at}
//               author_details={{
//                 username: username,
//                 avatar_path: image,
//                 rating: 0,
//               }}
//               content={content}
//               created_at={created_at}
//               id={movieID}
//             />
//           );
//         })}
//     </div>
//   );
// };

// export default UserReview;
