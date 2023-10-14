import { render } from "@testing-library/react";
import ImageDetail from '../ImageDetail';
import { describe, it } from "vitest";
import { withRouter }from  "../../test/utils";
import { Route } from "react-router-dom";
import { fakeImage } from '../../test/fakeData';

describe("ImageDetail", () => {
    it("renders ImageDetail correctly with video state", async () => {
        console.log(fakeImage)
        const {asFragment} = render(withRouter(<Route path="/" element={<ImageDetail />} />,{
            pathname: "/",
            state: {image: fakeImage},
            key: "my-key"
        }))
        expect(asFragment()).toMatchSnapshot()
    })
})