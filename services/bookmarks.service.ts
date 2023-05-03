import { firestoreDB, firebaseAuth } from "@/config/firebase.config"
import { doc, collection, onSnapshot, DocumentData, CollectionReference, deleteDoc } from "firebase/firestore"

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


export async function removeBookmark(movieID: any, collectionRef: CollectionReference<DocumentData>) {
    let updatedSavedMovies
    try {
        await deleteDoc(doc(collectionRef, movieID));
        console.log("Item removed from Firestore");

        const savedMovies = localStorage.getItem("savedMovies");
        if (savedMovies) {
            try {
                const parsedData = JSON.parse(savedMovies as string);
                if (Array.isArray(parsedData)) {
                    const updatedSavedMovies_ = parsedData.filter((id: string) => id !== movieID);
                    localStorage.setItem("savedMovies", JSON.stringify(parsedData.filter((id: string) => id !== movieID)));
                    console.log("Item removed from localStorage savedMovies");
                }
            } catch (error) {
                console.error("Error parsing stored savedMovies data:", error);
            }
        }

        const savedMoviesData = localStorage.getItem("savedMoviesData");
        if (savedMoviesData) {
            try {
                const parsedData = JSON.parse(savedMoviesData);
                if (Array.isArray(parsedData)) {
                    const updatedSavedMoviesData = parsedData.filter((movie: any) => movie.id !== movieID);
                    localStorage.setItem("savedMoviesData", JSON.stringify(updatedSavedMoviesData));
                    console.log("Item removed from localStorage savedMoviesData");
                }
            } catch (error) {
                console.error("Error parsing stored savedMoviesData data:", error);
            }
        }

    } catch (error) {
        throw error;
    }

    return updatedSavedMovies
}
