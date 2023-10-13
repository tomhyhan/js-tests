import HttpClient from "../../http/httpclient";

class ImageClient {
    constructor(private httpClient: HttpClient) {
    }

    async get(path: string, options: RequestInit) {
        const data = await this.httpClient.fetch("https://picsum.photos/200/300",{})
        console.log(await data.json())
    }
}