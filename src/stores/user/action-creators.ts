import {createAsyncThunk} from "@reduxjs/toolkit";
import {UserModel} from "../../models/user.model";

const getUser = (): Promise<UserModel> => new Promise((resolve) => resolve({email: "email@mail.com",id: 1,name: "roma",surname: "glushinskiy"}));

export const userActionCreators = {
    getUser: createAsyncThunk("user/get",
        (_,thunkAPI) => getUser()
            .catch(error => thunkAPI.rejectWithValue(error))
    ),
}