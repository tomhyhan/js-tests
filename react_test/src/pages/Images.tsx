import React from 'react'
import useSWR from 'swr'
import { useImage } from '../context/ImageProvider'
import Image from '../component/Image'
import { ImageT } from '../lib/Types/ImageT'
import AddImage from '../component/AddImage'

export default function Images() {
    const {imageService} = useImage()
    const {data: images, error, isLoading , mutate} = useSWR("images", () => imageService.getImages(), {
        revalidateOnFocus: false,
    })

    const handleImageAdd = async (imageLayout:string) => {
        const newImage = await imageService.getImage(imageLayout)
        await mutate([...images, newImage], {
            revalidate:false
        })
    }

    return (
        <main>
            <AddImage onAddImage={handleImageAdd} />
            {isLoading && <div>Loading...</div>}
            {error && <div>Something Went Wrong!</div>}
            <ul className="grid grid-cols-2 gap-4">
                {images?.map((image: ImageT) => (
                    <Image key={image.id} image={image}/>
                ))}
            </ul>
        </main>
  )
}
