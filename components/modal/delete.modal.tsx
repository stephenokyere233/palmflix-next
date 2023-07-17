import React, { FC } from "react";
import ModalLayout from "../layout/ModalLayout";
import { BiX } from "react-icons/bi";

const DeleteModal: FC<{ showModal: () => void ,removeAccount:()=>void}> = ({ showModal,removeAccount }) => {
  return (
    <ModalLayout onHideModal={showModal}>
      <h2 className="text-red-500 text-2xl">Permanently Delete your Account</h2>
      <BiX
        className="absolute top-6 right-10  cursor-pointer"
        onClick={showModal}
        size={28}
      />
      <div className="my-3">
      <p>Are you sure you want to permanently delete your account?</p>
      <p>This action is irreversible!</p>

      </div>
      <div className="grid grid-cols-2 gap-4 mt-3">
        <button
          style={{ background: "rgba(169, 169, 169, 0.2)" }}
          className=" rounded-md"
          onClick={showModal}
        >
          Cancel
        </button>
        <button className="bg-red-500 p-3 rounded-md" onClick={removeAccount}>Yes,Delete</button>
      </div>
    </ModalLayout>
  );
};

export default DeleteModal;
