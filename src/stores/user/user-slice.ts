import {UserModel} from "../../models/user.model";
import {createSlice, PayloadAction, Reducer} from "@reduxjs/toolkit";
import {userActionCreators} from "./action-creators";

export interface UserState {
    user: UserModel
    isLoading: boolean
}

const initialState: UserState = {
    user: null,
    isLoading: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUser(state) {
            if (state.user) {
                state.user = null
            }
        }
    },
    extraReducers: {
        [userActionCreators.getUser.pending.type]: (state) => {
            state.isLoading = true
        },
        [userActionCreators.getUser.fulfilled.type]: (state,action: PayloadAction<UserModel>) => {
            state.user = action.payload
            state.isLoading = false
        },
        [userActionCreators.getUser.rejected.type]: (state) => {
            state.isLoading = false
        }
    }
})

const userReducer : Reducer<UserState> = userSlice.reducer

export default userReducer;