import { useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestoreDB } from "@/config/firebase.config";
import { AppContext } from "@/context";

const useFetchUserReviews = () => {
  const { reviews, setReviews } = useContext(AppContext);

  const fetchReviews = async () => {
    const collectionRef = collection(firestoreDB, "user_reviews");
    let reviews_: any = [];
    try {
      const docsSnap = await getDocs(collectionRef);
      docsSnap.docs.forEach((doc) => reviews_.push(doc.data()));
      setReviews(reviews_);
    } catch (error) {
      console.error(error);
    }
  };

  return { reviews, fetchReviews };
};

export default useFetchUserReviews;
