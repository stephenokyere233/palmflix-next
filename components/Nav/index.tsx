import { TABS } from '@/constants/TABS'
import { AppContext } from '@/context'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

const Sidebar = () => {
    const router = useRouter()
    const { showSidebar, setShowSidebar }=useContext(AppContext)
    return (
        <>
            <nav className={`w-[300px] ${showSidebar ? "absolute w-full h-[90vh] flex" : "hidden"}  border-gray-600 py-6 px-4  md:flex  gap-10 flex-col bg-[#040720] `}>
                {
                    TABS.map(tab => (
                        <Link className={router.pathname === tab.route ? "text-brand" : ""} key={tab.name} href={tab.route}>
                            <div className='flex p-3 gap-3 items-center font-medium text-xl rounded-md hover:bg-[#ffffff12]'>
                                <tab.icon size={24} />
                                <p>{tab.name}</p>
                            </div>
                        </Link>
                    ))
                }
            </nav>

        </>
    )
}

export default Sidebar
