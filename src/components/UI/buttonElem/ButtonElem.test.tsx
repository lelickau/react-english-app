import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import ButtonElem from "./ButtonElem"



describe('ButtonElem', () => {
    it('should render a button with the class of default-btn', () => {
        render(<ButtonElem>Button text</ButtonElem>, {wrapper: MemoryRouter})
        const defaultButton = screen.getByRole('button', {name: /Button text/i})
        expect(defaultButton).toHaveClass('default-btn')
    })
})