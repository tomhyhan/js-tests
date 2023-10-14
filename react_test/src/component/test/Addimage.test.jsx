import { render, screen } from "@testing-library/react"
import {afterEach, describe, expect, it, vi} from "vitest"
import AddImage from './../AddImage';
import userEvent from "@testing-library/user-event";

describe("Addimage", () => {
    const onAddImage = vi.fn();
    
    afterEach(() => {
        onAddImage.mockReset()
    })

    it("renders Addimage correctly", async () => {
        const { asFragment } = render(<AddImage onAddImage={onAddImage}/>)

        expect(asFragment()).toMatchSnapshot()
    })

    it("calls onAddImage when form is submitted", async () => {
        render(<AddImage onAddImage={onAddImage}/>)

        const button = screen.getByRole("button")
        await userEvent.click(button)
        expect(onAddImage).toHaveBeenCalledOnce()
    })
    
})