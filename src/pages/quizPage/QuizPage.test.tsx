import { render, RenderResult, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { store } from "store"
import QuizPage from "./QuizPage"

const renderQuizPage = (): RenderResult =>
    render(
    <Provider store={store}>
        <MemoryRouter>
            <QuizPage/>
        </MemoryRouter>
    </Provider>
);

describe('QuizPage', () => {
    it('added quizTestData after clicking the button "startQuiz"', () => {
        renderQuizPage()
        const startBtn = screen.getByRole('button', {name: /Начать/i})
        userEvent.click(startBtn)
        const initialLength = store.getState().game.quizTestData.length
        expect(initialLength).toBe(10)
    })
})