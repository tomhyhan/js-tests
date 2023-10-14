import React from 'react'
import { useLocation } from 'react-router-dom'

export default function ImageDetail() {
    const {
        state: {image},
    } = useLocation()
    
  return (
    <ul>
        <li>{image.id}</li>
        <li>{image.download_url}</li>
        <li>{image.author}</li>
    </ul>
  )
}
