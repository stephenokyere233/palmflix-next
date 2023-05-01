import { img_path } from '@/constants/endpoints'
import { AppContext } from '@/context'
import Image from 'next/image'
import React, { useContext } from 'react'

type castProps = {
    name: string,
    profile: string
    id: number,
    character: string
}

const CastCard: React.FC<castProps> = ({ name, profile, id, character }) => {

    return (
        <div style={{ background: "rgba(169, 169, 169, 0.2)" }} className='max-w-[350px] rounded-md  p-2 cursor-pointer ' >
            <Image src={img_path + profile} alt={name} height={200} width={200} className='object-cover h-[300px] w-[250px]' />
            <p>{name}</p>
            <p>As {character}</p>
        </div>
    )
}

export default CastCard
