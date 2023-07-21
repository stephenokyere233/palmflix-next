import { firestoreDB } from "@/config/firebase.config";
import { IUser } from "@/interfaces";
import { UserCredential } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export async function onAuthenticationSuccess(
  firebaseUser: UserCredential["user"],
) {
  let docRef = doc(firestoreDB, `users/${firebaseUser.uid}`);
  let docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    if (!firebaseUser.email) return;

    let newUser: IUser = {
      dateRegistered: Date(),
      id: firebaseUser.uid,
      imageUrl: firebaseUser.photoURL || null,
      email: firebaseUser.email,
      name: firebaseUser.displayName || firebaseUser.email.split("@")[0],
    };
    setDoc(doc(firestoreDB, `users/${firebaseUser.uid}`), newUser)
      .then(async (result) => {
        toast.success("Signed up successfully");
      })
      .catch((error) => toast.error("Couldn't add user"));
  } else toast.success("Welcome");
}
