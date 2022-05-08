import { RootState } from '../index';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { db } from "firebase-config";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { IProgressData, IWords } from "models/IProgressData";

interface UserInitialState {
    email: string | null;
    username: string;
    id: string;
    points: number;
    status: string;
    error: string | undefined;
    words: IWords[];
    progressId: string | undefined;
}

const initialState: UserInitialState = {
    id: '',
    email: null,
    username: '',
    points: 0,
    status: '',
    error: '',
    words: [],
    progressId: '',
}

export const getUserProgress = createAsyncThunk<IProgressData, string, {rejectValue: string}>(
    'user/getUserProgress',
    async (id: string, {rejectWithValue}) => {
        try {
            const q = query(collection(db, "progress"), where("userId", "==", id))
            const querySnapshot = await getDocs(q)
            const progress: any[] = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))

            return {...progress[0]}
        } catch (e) {
            console.log("Error getting document: ", e)
            return rejectWithValue('Error getting document')
        }
    }
)

export const setInitialProgress = createAsyncThunk<IProgressData | undefined, IProgressData, {rejectValue: string}>(
    'user/setInitialProgress',
    async (query: IProgressData, {rejectWithValue}) => {
        try {
            const docRef = await addDoc(collection(db, "progress"), query)
            if (docRef.id) {
                return {
                    ...query,
                    id: docRef.id,
                }
            }
        } catch (e) {
            console.log("Error adding document: ", e)
            return rejectWithValue('Error adding document')
        }
    }
)

export const updateProgress = createAsyncThunk<IProgressData, any, {rejectValue: string, state: RootState}>(
    'user/updateProgress',
    async (query: any, {rejectWithValue, getState}) => {
        const progressId = getState().user.progressId
        console.log(query)
        try {
            if (progressId){
                const recipeDoc = doc(db, "progress", progressId)
                await updateDoc(recipeDoc, query)
                return query
            }
        } catch (e) {
            console.log('Error editing document: ', e)
            return rejectWithValue('Error editing document')
        }
    }
)

const setLoading = (state: UserInitialState) => {
    state.status = 'loading'
    state.error = ''
}

const setRejected = (state: UserInitialState, action: PayloadAction<string | undefined>) => {
    state.status = 'rejected'
    state.error = action.payload
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email
            state.id = action.payload.id
            state.username = action.payload.username
        },

        removeUser(state) {
            state.points = 0
            state.email = null
            state.username = ''
            state.id = ''
        },

        setUsername(state, action: PayloadAction<string>) {
            state.username = action.payload
        },

        setError (state, action: PayloadAction<string>) {
            state.error = action.payload
        },

        finishTest: (state, action: PayloadAction<number>) => {
            state.points += action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProgress.pending, setLoading)
            .addCase(getUserProgress.rejected, setRejected)
            .addCase(getUserProgress.fulfilled, (state, action: PayloadAction<IProgressData>) => {
                state.points = action.payload.points
                state.words = action.payload.words
                state.progressId = action.payload.id
                state.status = 'resolve'
                state.error = ''
            })
            .addCase(setInitialProgress.pending, setLoading)
            .addCase(setInitialProgress.rejected, setRejected)
            .addCase(setInitialProgress.fulfilled, (state, action) => {
                state.error = ''
                state.status = 'resolve'
                state.progressId = action.payload?.id
                state.points = action.payload!.points
                state.words = action.payload!.words
            })
            .addCase(updateProgress.pending, setLoading)
            .addCase(updateProgress.rejected, setRejected)
            .addCase(updateProgress.fulfilled, (state, action: PayloadAction<IProgressData>) => {
                state.error = ''
                state.status = 'resolve'
                state.points = action.payload.points
                state.words = action.payload.words
            })
    }
})

export const {setUser, removeUser, finishTest, setError, setUsername} = userSlice.actions
export default userSlice.reducer