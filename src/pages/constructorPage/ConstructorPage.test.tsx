import { render, RenderResult, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { store } from "store"
import ConstructorPage from "./ConstructorPage"

const renderQuizPage = (): RenderResult =>
    render(
    <Provider store={store}>
        <MemoryRouter>
            <ConstructorPage/>
        </MemoryRouter>
    </Provider>
);

describe('ConstructorPage', () => {
    it('added constructorTestData after clicking the button "startConstructor"', () => {
        renderQuizPage()
        const startBtn = screen.getByRole('button', {name: /Начать/i})
        userEvent.click(startBtn)
        const initialLength = store.getState().game.constructorTestData.length
        expect(initialLength).toBe(10)
    })
})
