// import { useEffect, useState } from "react";
// import { Review } from "@/interfaces";
// import {
//   collection,
//   query,
//   where,
//   onSnapshot,
//   Unsubscribe,
// } from "firebase/firestore";
// import { firestoreDB } from "@/config/firebase.config";

// const useUserReviews = (movieID: string): [Review[], Unsubscribe | null] => {
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const collectionRef = collection(firestoreDB, "user_reviews");
//   const q = query(collectionRef, where("movieID", "==", movieID));

//   // Subscribe to changes in the Firebase collection
//   const unsubscribe = onSnapshot(q, (docsSnap) => {
//     const updatedReviews: Review[] = [];
//     docsSnap.forEach((doc) => {
//       const reviewData = doc.data() as Review;
//     //   const existingReviewIndex = reviews.findIndex(
//     //     (review) => review.movieID === reviewData.movieID,
//     //   );

//     //   if (existingReviewIndex !== -1) {
//     //     // Update the existing review with new data
//     //     const updatedReview = {
//     //       ...reviews[existingReviewIndex],
//     //       ...reviewData,
//     //     };
//     //     updatedReviews.push(updatedReview);
//     //   } else {
//     //     // Add the new review to the array
//         updatedReviews.push(reviewData);
//     //   }
//     });

//     setReviews(updatedReviews);
//   });

//   // Unsubscribe from the Firebase collection when the component unmounts
//   useEffect(() => {
//     console.log("reviews hokk",reviews)
//     return () => {
//       if (unsubscribe) {
//         unsubscribe();
//       }
//     };
//   }, [reviews, unsubscribe]);

//   return [reviews, unsubscribe];
// };

// export default useUserReviews;
