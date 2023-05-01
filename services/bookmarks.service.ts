import { firestoreDB, firebaseAuth } from "@/config/firebase.config"
import { doc, collection, onSnapshot, DocumentData } from "firebase/firestore"

export async function fetchBookmarks() {
    const docRef = doc(firestoreDB, `user_bookmarks/${firebaseAuth.currentUser?.uid}`)
    const subCollectionRef = collection(docRef, `saved_bookmarks`)
    const movieIDS_: DocumentData[] = []
    const savedMoviesData_: DocumentData[] = []

    onSnapshot(subCollectionRef, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            movieIDS_.push(doc.data().id)
            savedMoviesData_.push(doc.data())
        })
        console.log("movieIDS_", movieIDS_)
        console.log("savedMoviesData_", savedMoviesData_)
        localStorage.setItem("savedMovies", JSON.stringify(movieIDS_))

    })

    return { movieIDS_, savedMoviesData_ }
}
