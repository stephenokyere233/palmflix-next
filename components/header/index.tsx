import React, { FormEvent, useContext } from 'react'
import { BiSun } from "react-icons/bi"
import { useRouter } from "next/router"
import { AppContext } from '@/context'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'
import Loader from '../loader/Loader'
import LoadIcon from '../loader/LoadIcon'
import { firebaseAuth } from '@/config/firebase.config'
import { User, onAuthStateChanged } from 'firebase/auth'
import Link from 'next/link'
import Logo from '../logo'
import Image from 'next/image'
import UserDropDown from '../modal/user.modal'

const Header = () => {
  const router = useRouter()
  const [loading, setLoading] = React.useState<boolean>(false)

  const { showSignupModal, setShowSignupModal, showLoginModal, setShowLoginModal, searchQuery, setSearchQuery, searchResults, setSearchResults, showUserDropdown, setShowUserDropdown, authenticatedUser, setAuthenticatedUser } = useContext(AppContext)

  const handleSearch = async (query: string) => {
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
    <header className={`flex z-20 ${router.pathname === "/" && "fixed top-0"}  w-full justify-between px-10  h-20 items-center`}>
      <Logo />
      <div className=''>
        <form onSubmit={handleSubmit}>
          <div className='border border-gray-400 p-2 px-4 rounded-md flex items-center justify-start gap-4 min-w-[400px] relative bg-gray-400 bg-opacity-20'>
            <FaSearch className='text-gray-400' />
            <input className='bg-transparent w-[85%]  outline-none' type="search" id="movie" placeholder='Search for movies' value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
            {loading && <LoadIcon />}
          </div>
        </form>
      </div>

      {
        !firebaseAuth.currentUser?.uid ?
          <button onClick={() => setShowLoginModal(true)}>Login</button> : <div className='relative'>
            <Image onClick={()=>setShowUserDropdown(true)} src={firebaseAuth.currentUser?.photoURL || "/user1.png"} alt={firebaseAuth.currentUser?.displayName || ""} width={100} height={100} className='rounded-full w-12 h-12 cursor-pointer bg-brand' />
           { showUserDropdown&&<UserDropDown/>}
          </div>
      }
   
    </header>
  )
}

export default Header
