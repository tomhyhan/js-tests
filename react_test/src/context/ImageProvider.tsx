import React, { createContext, useContext} from 'react'
import ImageClient from './../lib/api/ImageClient';
import ImageService from '../lib/services/ImageService';

export const ImageContext = createContext({} as {imageService: ImageService})

const imageClient = new ImageClient()
const imageService = new ImageService(imageClient)

export function ImageProvider({children} : {
    children: React.ReactNode
}) {
    return (
    <ImageContext.Provider value={{imageService}}>
      {children}
    </ImageContext.Provider>
  )
}

export function useImage() { 
    return useContext(ImageContext)
}