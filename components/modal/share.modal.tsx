/* eslint-disable react-hooks/exhaustive-deps */
import { AppContext } from "@/context";
import React, { useContext } from "react";
import ModalLayout from "../layout/ModalLayout";
import { BiX ,BiCopy} from "react-icons/bi";

const ShareModal = () => {
  const [url, setUrl] = React.useState<string>(window.location.href);
  const [loading, setLoading] = React.useState<boolean>(false);
  const {  setShowShareModal } = useContext(AppContext);

  return (
    <ModalLayout onHideModal={() => setShowShareModal(false)}>
      <section className=" flex w-full min-w-[350px] flex-col items-center justify-center gap-4 p-2 ">
        <BiX
          className="absolute right-10 top-6 cursor-pointer"
          onClick={() => setShowShareModal(false)}
          size={28}
        />
        <h1 className="text-2xl uppercase">Share with friends</h1>
        <div className="flex w-full flex-col pb-2">
          <label htmlFor="password">Review</label>
          <div className="flex items-center gap-4 justify-between">
            <input
              name="comment"
              value={url}
              className="rounded-md border bg-transparent p-2 outline-none cursor-text flex-1"
              disabled
            />
            <p
              style={{ background: "rgba(169, 169, 169, 0.2)" }}
              className="flex gap-2 cursor-pointer p-2 rounded-md"
            >
              <span>Copy</span>
              <BiCopy size={24} />
            </p>
          </div>
        </div>

        <button
          style={{ background: "rgba(169, 169, 169, 0.2)" }}
          className="flex w-full items-center justify-center gap-2 rounded-md  p-2 text-center"
        >
          {loading ? "Loading..." : "Submit Review"}
        </button>
      </section>
    </ModalLayout>
  );
};

export default ShareModal;
