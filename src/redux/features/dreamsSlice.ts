import { createSlice } from "@reduxjs/toolkit";


const dreamsInititalState = {
    data: [],
    status: "idle",
    error: null
}

export const dreamSlice = createSlice({
    name: "dream",
    initialState: dreamsInititalState,
    reducers: {
        setDreams: (state, action) => {
            return action.payload
        }
    }
})

export const { setDreams } = dreamSlice.actions

export default dreamSlice.reducer