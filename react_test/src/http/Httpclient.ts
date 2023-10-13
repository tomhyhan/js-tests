export default class HttpClient {
    baseUrl: string;
    constructor() {
        this.baseUrl = "https://picsum.photos";
    }

    async fetch(path: string, options: RequestInit) {

        try {
            const res = await fetch(`${this.baseUrl}${path}`, options);
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res;
        } catch (err) {
            console.error(err)
        }
    }
    
}