/* eslint-disable react-hooks/exhaustive-deps */
import React, { FormEvent, useContext } from 'react'
import { useRouter } from "next/router"
import { AppContext } from '@/context'
import { FaBars, FaSearch } from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'
import LoadIcon from '../loader/LoadIcon'
import { firebaseAuth } from '@/config/firebase.config'
import { onAuthStateChanged } from 'firebase/auth'
import Logo from '../logo'
import Image from 'next/image'
import UserDropDown from '../modal/user.modal'
import { BiX } from 'react-icons/bi'

const Header = () => {
  const router = useRouter()
  const [loading, setLoading] = React.useState<boolean>(false)

  const { setShowLoginModal, searchQuery, setSearchQuery, setSearchResults, showUserDropdown, setShowUserDropdown, setAuthenticatedUser, showSidebar, setShowSidebar } = useContext(AppContext)

  const handleSearch = async (query: string) => {
    if(!query) {
      toast.error("pass a query")
      return
    }
    setLoading(true)
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=49aadc9bda210df9f0d47e374c404fd5&query=${query}&page=1`);
      console.log(response.data);
      setSearchResults(response.data)
      setLoading(false)
      router.push(`/search?query=${searchQuery}`)
    } catch (error) {
      console.log(error);
      toast.error("erroring getting data")
      setLoading(false)

    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    handleSearch(searchQuery)
    console.log(searchQuery)
  }


  React.useEffect(() => {
    listenForAuthStateChange()
  }, [])


  async function listenForAuthStateChange() {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user && user.email) {
        setAuthenticatedUser(user)
      } else console.log("logged out")
    })
  }

  return (
    <header className={`flex z-20 ${router.pathname === "/" && "fixed top-0"}  w-full justify-between px-4 md:px-10  h-20 items-center`}>
      <Logo />
      <div className='hidden md:block'>
        <form onSubmit={handleSubmit}>
          <div className='border border-gray-400 p-2 px-4 rounded-md flex items-center justify-start gap-4 min-w-[400px] relative bg-gray-400 bg-opacity-20'>
            <FaSearch className='text-gray-400' />
            <input className='bg-transparent w-[85%]  outline-none' type="search" id="movie" placeholder='Search for movies' value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
            {loading && <LoadIcon />}
          </div>
        </form>
      </div>


      <div className='flex items-center gap-3'>{
        !firebaseAuth.currentUser?.uid ?
          <button className='p-1 px-2 rounded-md bg-brand ' onClick={() => setShowLoginModal(true)}>Login</button> : <div className='relative'>
            <Image onClick={() => setShowUserDropdown(true)} src={firebaseAuth.currentUser?.photoURL || "/user1.png"} alt={firebaseAuth.currentUser?.displayName || ""} width={100} height={100} className='rounded-full w-12 h-12 cursor-pointer bg-brand' />
            {showUserDropdown && <UserDropDown />}
          </div>}
        {
          router.pathname !== "/" &&
          <div className='md:hidden block'>
            {
              showSidebar ? <BiX size={24} onClick={() => setShowSidebar(false)} /> :
                <FaBars size={24} onClick={() => setShowSidebar(true)} />
            }
          </div>
        }
      </div>


    </header>
  )
}

export default Header
