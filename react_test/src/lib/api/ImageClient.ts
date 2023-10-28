import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

export default class ImageClient {
    baseUrl: string
    http: AxiosInstance

    constructor() {
        this.baseUrl = "https://picsum.photos";
        this.http = axios.create({
            baseURL: this.baseUrl,
        })
    }

    async getImages(params : AxiosRequestConfig) {
        return await this.http.get("/v2/list", params);
    }
    
    async getImage() {
        const randomNumber = Math.floor(Math.random() * 1085);
        return await this.http.get(`/id/${randomNumber}/info`);
    }

}