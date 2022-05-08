import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IConstructorData, IQuizData } from "models/IWordsData"

type SliceState = { quizTestData: IQuizData[], constructorTestData: IConstructorData[] }
const initialState: SliceState = {
    quizTestData: [],
    constructorTestData: [],
}

const gameSlice = createSlice({
    name: 'gameSlice',
    initialState,
    reducers: {
        createQuizGameTest: (state, action: PayloadAction<IQuizData[]>) => {
            state.quizTestData = action.payload
        },
        deleteTestData: (state) => {
            state.quizTestData = []
            state.constructorTestData = []
        },
    }
})

export const {createQuizGameTest, deleteTestData} =  gameSlice.actions
export default gameSlice.reducer