import React from 'react'
import { ImageT } from '../lib/Types/ImageT';
import { useNavigate } from 'react-router-dom';

export default function Image({image}: {
    image: ImageT
}) {
    const navigate = useNavigate()

    const handleImageClick = () => {
        navigate(`/images/${image.id}`, {
            state: { image },
        })
    }

    return (
        <li className="px-4 cursor-pointer" onClick={handleImageClick}>
            <img src={image.download_url} alt={image.author} onClick={handleImageClick}/>
        </li>
    )
}
