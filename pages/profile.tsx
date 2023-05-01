/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowBackIosNew } from "react-icons/md";
import NRInput from "@/components/NRInput";
import { AppContext } from "@/context";
import { firebaseAuth } from "@/config/firebase.config";
import { updateProfile } from "firebase/auth";
import { toast } from "react-hot-toast";

const Profile = () => {
    const [updateForm, setUpdateForm] = React.useState<{ profile: string | null, name: string, email: string }>({
        profile: "",
        name: "",
        email: "",
    });

    const { authenticatedUser } = useContext(AppContext)

    useEffect(() => {
        setUpdateForm((prev) => ({
            ...prev,
            name: authenticatedUser?.displayName || "",
            email: authenticatedUser?.email,
            profile: authenticatedUser?.profileURL || ""

        }));

    }, [])


    const controlUpdateForm = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setUpdateForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
 
    const updateUserData = () => {
        if (!firebaseAuth.currentUser) return
        updateProfile(firebaseAuth.currentUser, {
            displayName: updateForm.name, photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
            toast.success("profile updated")
            // Profile updated!
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        });
    }

    // async function handleSubmit(event) {
    //     event.preventDefault();
    //     await sendNewProfileInfo(userData._id, updateForm)
    //     console.log(updateForm);
    // }
    // const { userData } = useContext(AppContext);

    // React.useEffect(() => {
    //     if (!userData) return;

    //     setUpdateForm({
    //         name: userData.name,
    //         email: userData.email,
    //         phone: userData.phone,
    //         profile: userData.profile ? userData.profile : "",
    //     });
    // }, [userData]);

    const handleImageUpload = (event: any) => {
        const image = event.target.files[0];
        if (!image) return;
        const reader = new FileReader();

        reader.onload = function (event) {
            setUpdateForm((prev) => ({
                ...prev,
                profile: reader.result as string,
            }));
        };

        reader.readAsDataURL(image);
    };

    return (
        <section className="w-full flex items-center justify-center flex-1 h-[90vh]">
            <div className="w-[500px] flex flex-col items-center p-4 px-8 rounded-md">
                <Link
                    href={""}
                    className="hidden w-full items-center md:flex"
                >
                    <MdArrowBackIosNew size={20} className="my-2" />
                    <p className="opacity-70">Back</p>
                </Link>
                <Link
                    href={""}
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
                    src={updateForm.profile ? updateForm?.profile : "/user1.png"}
                    className={`h-32 w-32 rounded-full bg-contain object-cover ${!updateForm.profile && "bg-brand"}`}
                    alt="profile_image"
                    height={500}
                    width={500}
                />

                <form className="flex flex-col gap-4 w-[90%]"

                // onSubmit={handleSubmit}
                >
                    <NRInput
                        title="Avatar"
                        name="profile"
                        type="file"
                        onChange={handleImageUpload}
                    />
                    <NRInput
                        title="Name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        onChange={controlUpdateForm}
                        value={updateForm.name}
                    />
                    <NRInput
                        title="Email"
                        name="email"
                        type="email"
                        value={updateForm.email}
                        autoComplete="email"
                        onChange={controlUpdateForm}
                        placeholder="johndoe21@example.com"
                    />
                    <div className="pt-2">
                        <button className=" w-full text-xl p-3 rounded-md bg-brand">
                            Update Profile
                        </button>
                    </div>
                </form>

            </div>
        </section>

    );
};

export default Profile;