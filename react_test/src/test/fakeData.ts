import { ImageT } from "../lib/Types/ImageT";

export const fakeImage: ImageT= {
    id: "2",
    url: "https://foo.bar.url",
    height: 100,
    width: 100,
    download_url: "https://foo.bar.download_url/",
    author: "Bar"
}

export const fakeBlurImage: ImageT= {
    id: "2",
    url: "https://foo.bar.url",
    height: 100,
    width: 100,
    download_url: "https://foo.bar.download_url/?blur=5",
    author: "Bar"
}

export const fakeGrayscaleImage: ImageT= {
    id: "2",
    url: "https://foo.bar.url",
    height: 100,
    width: 100,
    download_url: "https://foo.bar.download_url/?grayscale",
    author: "Bar"
}

export const fakeImages: ImageT[] = [
    {
        id: "0",
        url: "https://foo.bar.url",
        height: 100,
        width: 100,
        download_url: "https://foo.bar.download_url_1",
        author: "Foo"
    },
    {
        id: "1",
        url: "https://john.doe.url",
        height: 100,
        width: 100,
        download_url: "https://john.doe.download_url_2",
        author: "john"
    }
]