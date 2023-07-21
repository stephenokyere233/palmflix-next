import React, { FC, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { firebaseAuth } from "@/config/firebase.config";
import toast from "react-hot-toast";
import ModalLayout from "../layout/ModalLayout";
import { BiX } from "react-icons/bi";

const PasswordReset: FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const resetPassword = () => {
    if (!email) {
      toast.error("enter email");
      return;
    }
    const toastID = toast.loading("Sending reset Link");
    setLoading(true);
    sendPasswordResetEmail(firebaseAuth, email)
      .then(() => {
        toast.success("Check your email for link to rest password");
        toast.dismiss(toastID);
        setLoading(false);
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/user-not-found).") {
          toast.error("Email not found");
          toast.dismiss(toastID);
          setLoading(false);
        }
        toast.error("Something went wrong");
        toast.dismiss(toastID);
        setLoading(false);
      });
  };

  return (
    <ModalLayout onHideModal={closeModal}>
      <div className="min-w-[300px]">
        <BiX
          className="absolute top-6 right-4 cursor-pointer"
          onClick={closeModal}
        />
        <h2 className="text-2xl leading-0 font-bold text-primary text-center">
          Reset password via Email
        </h2>
        <div className="flex w-full  flex-col gap-2 my-2">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            value={email}
            placeholder="Enter your email"
            className="bg-transparent border outline-none p-2 rounded-md "
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <button
          onClick={resetPassword}
          style={{ background: "rgba(169, 169, 169, 0.2)" }}
          className="flex text-xl w-full items-center justify-center gap-2 rounded-md  p-2 text-center mt-4"
        >
          {loading ? "Loading..." : `Reset password`}
        </button>
      </div>
    </ModalLayout>
  );
};

export default PasswordReset;
