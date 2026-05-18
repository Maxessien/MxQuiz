import { AppSlice, AppTheme } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AppSlice = {
    height: 480, theme: "dark", width: 480
}

const appSlice = createSlice({
    initialState,
    name: "app",
    reducers: {
        setWindowSize: (state, {payload: {height, width}}: PayloadAction<Pick<AppSlice, "height" | "width">>)=>{
            state.height = height
            state.width = width
        },
        setTheme: (state, {payload}: PayloadAction<AppTheme>)=>{
            state.theme = payload
        }
    }
})

const appReducer = appSlice.reducer

export const {setTheme, setWindowSize} = appSlice.actions
export default appReducer