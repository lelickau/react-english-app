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
        createConstructorGameTest: (state, action: PayloadAction<IConstructorData[]>) => {
            state.constructorTestData = action.payload
        },
        deleteTestData: (state) => {
            state.quizTestData = []
            state.constructorTestData = []
        },
    }
})

export const {createQuizGameTest, createConstructorGameTest, deleteTestData} =  gameSlice.actions
export default gameSlice.reducer