import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/types/mongoModels";


const user : IUser = {
    _id: null,
    username: "",
    mail: "",
    password: "",
    name: "",
    lastName: "",
    phone: 0,
    avatar: "",
    zodiac: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
}

export const userSlice = createSlice({
    name: "user",
    initialState: user,
    reducers: {
        setUser: (state, action) => {
            return action.payload
        }
    }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer