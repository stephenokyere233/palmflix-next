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
        const movieIDSToSave = new Set(movieIDS_)
        const parsedIDSTOSave = Array.from(movieIDSToSave)
        localStorage.setItem("savedMovies", JSON.stringify(parsedIDSTOSave))

        const movieIDSDataToSave = new Set(savedMoviesData_)
        const parsedMovieIDSDataToSave = Array.from(movieIDSDataToSave)
        localStorage.setItem("savedMoviesData", JSON.stringify(parsedMovieIDSDataToSave))

    })

    return { movieIDS_, savedMoviesData_ }
}
