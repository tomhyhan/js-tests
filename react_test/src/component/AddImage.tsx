import React from 'react'

export default function AddImage({onAddImage}: {
    onAddImage: (imageLayout:string) => void
}) {
    const handleImageAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const imageLayout = formData.get('imageLayout')
        onAddImage(imageLayout!.toString())
    }

  return (
    <form className="flex p-5" onSubmit={handleImageAdd}>
        <select name="imageLayout" defaultValue="normal" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block mr-5">
            <option value="normal">normal</option>
            <option value="blur">blur</option>
            <option value="grayscale">grayscale</option>
        </select>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Image</button>
    </form>
  )
}
