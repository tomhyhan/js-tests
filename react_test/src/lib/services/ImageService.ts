class ImageService {
    constructor(private client: ImageClient) {
        this.client = client;
    }

    async getImage() {
        const res = await this.client.get()
        console.log(await res.json())
    }
}