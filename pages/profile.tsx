/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowBackIosNew } from "react-icons/md";
import NRInput from "@/components/NRInput";
import { AppContext } from "@/context";
import {
  cloudStorage,
  firebaseAuth,
  firestoreDB,
} from "@/config/firebase.config";
import { deleteUser, updateProfile } from "firebase/auth";
import { toast } from "react-hot-toast";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import DeleteModal from "@/components/modal/delete.modal";

const Profile = () => {
  const router = useRouter();
  const [updateForm, setUpdateForm] = React.useState<{
    profile: string | null;
    name: string;
    email: string;
  }>({
    profile: "",
    name: "",
    email: "",
  });

  const [file, setFile] = React.useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const { authenticatedUser } = useContext(AppContext);

  useEffect(() => {
    setUpdateForm((prev) => ({
      ...prev,
      name: authenticatedUser?.displayName || "",
      email: authenticatedUser?.email,
      profile: authenticatedUser?.photoURL || "",
    }));
  }, [authenticatedUser]);

  const controlUpdateForm = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUpdateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateUserData = () => {
    if (!firebaseAuth.currentUser) return;

    if (file) {
      const storageRef = ref(cloudStorage, `${name}.jpg`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          if (!firebaseAuth.currentUser) return;
          await updateProfile(firebaseAuth.currentUser, {
            displayName: updateForm.name,
            photoURL: downloadURL,
          })
            .then(() => {
              toast.success("profile updated");
              setLoading(false);
            })
            .catch((error) => {
              setLoading(false);
              toast.error("profile cant updated");
            });
        });
      });
    } else {
      updateProfile(firebaseAuth.currentUser, {
        displayName: updateForm.name,
      })
        .then(() => {
          toast.success("profile updated");
        })
        .catch((error) => {
          toast.error(" cant update profile");
        });
    }
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    updateUserData();
    console.log(updateForm);
  }

  async function deleteAccount() {
    if (!firebaseAuth.currentUser) return;
    let docRef = doc(firestoreDB, `users/${firebaseAuth.currentUser.uid}`);
    const toastID = toast.loading("Removing your account");
    deleteUser(firebaseAuth.currentUser)
      .then(async () => {
        await deleteDoc(docRef)
          .then(() => {
            toast.success("your account has been deleted");
            toast.dismiss(toastID);
            setShowDeleteModal(false);
            router.push("/");
          })
          .catch((err) => {
            toast.error("something went wrong");
            toast.dismiss(toastID);
            console.log("err", err);
          });
        // User deleted.
      })
      .catch((error) => {
        toast.error("something went wrong");
        toast.dismiss(toastID);
        console.log("error", error);
      });
  }

  return (
    <section className="w-full flex items-center justify-center flex-1 h-[90vh]">
      {showDeleteModal && (
        <DeleteModal
          showModal={() => setShowDeleteModal(false)}
          removeAccount={deleteAccount}
        />
      )}
      <div className="w-[500px] flex flex-col items-center p-4 px-8 rounded-md">
        <Link href={"/"} className="hidden w-full items-center md:flex">
          <MdArrowBackIosNew size={20} className="my-2" />
          <p className="opacity-70">Back</p>
        </Link>
        <Link
          href={"/"}
          className="absolute top-24 left-2 flex w-full items-center md:hidden"
        >
          <MdArrowBackIosNew size={20} className="my-2" />
          <p className="opacity-70">Back</p>
        </Link>
        <div className=" my-4 text-center">
          <h2 className="text-2xl font-bold uppercase tracking-tighter text-brand">
            Trailers home
          </h2>
          <h2 className="text-lg">Edit your profile info</h2>
        </div>

        <Image
          src={updateForm.profile ? updateForm.profile : "/user1.png"}
          className={`h-32 w-32 rounded-full bg-contain object-cover ${
            !updateForm.profile && "bg-brand"
          }`}
          alt="profile_image"
          height={500}
          width={500}
        />

        <form className="flex flex-col gap-4 w-[90%]" onSubmit={handleSubmit}>
          <NRInput
            title="Avatar"
            name="profile"
            type="file"
            onChange={(e) => {
              e.target.files && setFile(e.target.files[0]);
            }}
            isRequired={false}
          />
          <NRInput
            title="Name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            onChange={controlUpdateForm}
            value={updateForm.name}
            isRequired={false}
          />
          <NRInput
            isRequired={false}
            title="Email"
            name="email"
            type="email"
            isDisabled={true}
            value={updateForm.email}
            autoComplete="email"
            onChange={controlUpdateForm}
            placeholder="johndoe21@example.com"
          />
          <div className="pt-2">
            <button className=" w-full text-xl p-3 rounded-md bg-brand">
              {loading ? "updating..." : " Update Profile"}
            </button>
          </div>
        </form>
        <div className=" px-6 mt-4">
          <h2 className="text-2xl text-red-500 mb-2">Danger Zone</h2>
          <div className="flex flex-col gap-2">
            <p>
              Deleting your account will permanently remove all of its data and
              files.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-500 mt-2 rounded-md py-3 px-4 mx-auto w-full text-xl "
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
