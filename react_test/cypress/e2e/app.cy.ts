/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('Random Image app', () => {

    beforeEach(() => {
        cy.intercept("GET", /\/v2\/list/ ,{
            fixture: "images.json"
        })

        cy.intercept("GET", /\/id\/\d+\/info/ ,{
            fixture: "image.json"
        })

        cy.visit('/')
    })

    it('renders 3 images when page is rendered', () => {
        cy.findAllByRole("img").should("have.length", 3)
    })
  
    it('shows image detail when image is clicked', () => {
        cy.findAllByRole("img").first().click()
        cy.findByText("https://picsum.photos/id/12/2500/1667").should("exist")
        cy.findByText("12").should("exist")
        cy.findByText("Paul Jarvis").should("exist")
    })
  
    it("add a new normal image when add image button is clicked", () => {
        cy.findByRole("button").click()
        cy.findAllByRole("img").should("have.length", 4)
        cy.findByAltText("foo bar").should("exist")
        cy.findByAltText("foo bar").should("have.attr", "src", "https://picsum.photos/id/669/4869/3456")
    })

    it("add a new blur image when add image button is clicked", () => {
        cy.findByRole("combobox").select("blur")
        cy.findByRole("button").click()
        cy.findAllByRole("img").should("have.length", 4)
        cy.findByAltText("foo bar").should("exist")
        cy.findByAltText("foo bar").should("have.attr", "src", "https://picsum.photos/id/669/4869/3456?blur=5")
    })

    it("add a grayscale image when add image button is clicked", () => {
        cy.findByRole("combobox").select("grayscale")
        cy.findByRole("button").click()
        cy.findAllByRole("img").should("have.length", 4)
        cy.findByAltText("foo bar").should("exist")
        cy.findByAltText("foo bar").should("have.attr", "src", "https://picsum.photos/id/669/4869/3456?grayscale")
    })
})