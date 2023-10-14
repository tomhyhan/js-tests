import { ImageT } from "../lib/Types/ImageT";

export const fakeImage: ImageT= {
    id: "0",
    url: "https://foo.bar.url",
    height: 100,
    width: 100,
    download_url: "https://foo.bar.download_url",
    author: "Foo"
}

export const fakeImages: ImageT[] = [
    {
        id: "0",
        url: "https://foo.bar.url",
        height: 100,
        width: 100,
        download_url: "https://foo.bar.download_url",
        author: "Foo"
    },
    {
        id: "1",
        url: "https://john.doe.url",
        height: 100,
        width: 100,
        download_url: "https://john.doe.download_url",
        author: "john"
    }
]