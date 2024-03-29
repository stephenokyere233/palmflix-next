import React, { useContext } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseAuth } from "@/config/firebase.config";
import { onAuthenticationSuccess } from "@/services/auth.service";
import toast from "react-hot-toast";
import { BiX } from "react-icons/bi";
import ModalLayout from "../layout/ModalLayout";
import { AppContext } from "@/context";

const SignUpModal = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const { setShowSignupModal, setShowLoginModal } = useContext(AppContext);

  const registerUserWithEmailAndPassword = async () => {
    setLoading(true);
    if (email !== "" || password !== "" || name !== "") {
      try {
        const res = await createUserWithEmailAndPassword(
          firebaseAuth,
          email,
          password,
        );
        await updateProfile(res.user, {
          displayName: name,
        })
          .then(() => {
            onAuthenticationSuccess(res.user);
            setShowSignupModal(false);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            toast.error("couldn't add user details");
          });
      } catch (error: any) {
        console.error(error);
        toast.error(`${error.message}`);
        setLoading(false);
      }
    } else {
      setErrorMessage("One or more fields empty");
    }
  };

  return (
    <ModalLayout onHideModal={() => setShowLoginModal(false)}>
      <section className="relative p-2 w-full flex flex-col gap-4 justify-center items-center min-w-[350px]">
        <BiX
          className="absolute top-6 right-4 cursor-pointer"
          onClick={() => setShowSignupModal(false)}
        />
        <h1 className="text-2xl uppercase">Signup</h1>
        <div className="flex w-full flex-col">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            type="text"
            className="bg-transparent border outline-none p-2 rounded-md"
            onChange={(event) => {
              setName(event.target.value);
              if (email !== "" || password !== "" || name !== "") {
                setErrorMessage("");
              }
            }}
          />
        </div>
        <div className="flex w-full flex-col">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            value={email}
            className="bg-transparent border outline-none p-2 rounded-md"
            onChange={(event) => {
              setEmail(event.target.value);
              if (email !== "" || password !== "" || name !== "") {
                setErrorMessage("");
              }
            }}
          />
        </div>
        <div className="flex w-full flex-col">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            className="bg-transparent border outline-none p-2 rounded-md"
            onChange={(event) => {
              setPassword(event.target.value);
              if (email !== "" || password !== "" || name !== "") {
                setErrorMessage("");
              }
            }}
          />
        </div>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <button
          onClick={registerUserWithEmailAndPassword}
          className="border w-full justify-center rounded-md bg-[#2221] p-2 flex items-center gap-2"
        >
          {loading ? "loading..." : "Sign Up"}
        </button>
      </section>
    </ModalLayout>
  );
};

export default SignUpModal;
