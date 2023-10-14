import ImageClient from "../api/ImageClient";

export default class ImageService {
    constructor(private client: ImageClient) {
        this.client = client;
    }

    async getImages() {
        const randomPage = Math.floor(Math.random() * 11);
        const images = await this.client.getImages({params:{limit:3, page:randomPage}});
        return images.data
    }
    
    async getImage(imageLayout: string) {
        const data = await this.client.getImage();
        const image = data.data 
        switch(imageLayout) {
            case "normal":
                break
            case "blur":
                image.download_url = image.download_url + "?blur=5"
                break
            case "grayscale":
                image.download_url = image.download_url + "?grayscale"
                break
            default:
                throw new Error("Invalid image layout")                
        }
        return image
    }
}