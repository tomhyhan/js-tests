import React from "react"
import { describe, it } from 'vitest'
import { withRouter } from "../../test/utils"
import {Route} from "react-router-dom"
import Image from "../Image"
import { fakeImage } from "../../test/fakeData"
import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom';

describe("Image",()=> {
    it("renders Image",() => {
        const { asFragment } = render(withRouter(
            <Route path="/" element={<Image image={fakeImage}/>}/>
        ))

        expect(asFragment()).toMatchSnapshot()
    })

    it("navigate to image detail page", async () => {
        render(withRouter(
            <>
                <Route path="/" element={<Image image={fakeImage}/>}/>
                <Route path={`/images/${fakeImage.id}`} element={imageDetailComponent()}/>
            </>
        ))

        const link = screen.getByRole("img")
        await userEvent.click(link)
        expect(screen.getByText(JSON.stringify(fakeImage))).toBeInTheDocument()
    })

    function imageDetailComponent() {
        return <pre>{JSON.stringify(fakeImage)}</pre>
    }
})

