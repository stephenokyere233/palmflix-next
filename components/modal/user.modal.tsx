import React, { useContext } from 'react'
import Link from 'next/link'
import { BiUser, BiLogOut, BiX, BiBookmark } from 'react-icons/bi'
import { firebaseAuth } from '@/config/firebase.config'
import toast from 'react-hot-toast'
import { AppContext } from '@/context'
import { motion } from 'framer-motion'
import ModalLayout from '../layout/ModalLayout'

const UserDropDown = () => {

    const { authenticatedUser, setAuthenticatedUser, showUserDropdown, setShowUserDropdown, setSavedMovieIDS, setBookmarkedMovies } = useContext(AppContext)

    const signOut = () => {
        firebaseAuth.signOut().then(() => {
            setAuthenticatedUser(null)
            localStorage.clear()
            sessionStorage.clear()
            setShowUserDropdown(false)
            setSavedMovieIDS([])
            setBookmarkedMovies([])
            toast.success("Logged out Successfully")
        }).catch((error) => {
            console.log(error)

        })

    }
    return (
        <ModalLayout onHideModal={() => setShowUserDropdown(false)}>

            <h2 className='mb-4'>MENU</h2>
            <BiX className='absolute top-6 right-10 text-black cursor-pointer' onClick={() => setShowUserDropdown(false)} size={28} />

            <div
                style={{ background: "rgba(169, 169, 169, 0.2)" }}
                className={` w-[300px] flex flex-col rounded-md  text-xl text-white`}
            >
                <Link
                    href={"/profile"}
                    className="flex opacity-100 items-center border-[#222] border-b gap-2 px-4 py-3"
                >
                    <BiUser />
                    Profile
                </Link>
                <Link
                    href={"/bookmarks"}
                    className="flex opacity-100 items-center border-[#222] border-b gap-2 px-4 py-3"
                >
                    <BiBookmark />
                    Saved Trailers
                </Link>

                <button
                    className="flex items-center gap-2 px-4 py-3"
                    onClick={signOut}
                >
                    <BiLogOut />
                    Logout
                </button>
            </div>
        </ModalLayout>
    )
}

export default UserDropDown