import { AppContext } from "@/context";
import { motion } from "framer-motion"
import React from "react";

export type TModalProps = {
    showModal?: boolean,
    title?: string,
    onHideModal?: () => void,
    modalColor?: string,
    children?: React.ReactNode
}

const ModalLayout: React.FC<TModalProps> = ({ showModal, title, children, onHideModal, modalColor }) => {
    const { showSignupModal, setShowSignupModal, showLoginModal, setShowLoginModal, setShowUserDropdown } = React.useContext(AppContext);
    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            if (onHideModal) {
                setShowSignupModal(false);
                setShowLoginModal(false);
                setShowUserDropdown(false)
                onHideModal()
            };
        }
    }

    if (showModal === false) return (<></>)
    else return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-screen h-screen bg-[#00000080] z-[20] fixed top-0 left-0 flex items-center justify-center" onClick={handleBackgroundClick}>
            <div className="p-2 md:p-0 absolute ">
                <div className={`bg-[#00094B] p-2 md:p-10 rounded-xl w-full max-w-[650px] `}>
                    {children}
                </div>
            </div>
        </motion.div>
    )
}

export default ModalLayout
