import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartDetailsReducer from "./features/user/cartDetailsSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userReducer,
            cartDetails: cartDetailsReducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>   // return type of makeStore is AppStore
export type RootState = ReturnType<AppStore['getState']>  // return type of getState(current Redux state or useSelector) is RootState
export type AppDispatch = AppStore['dispatch']  // return type of dispatch(function to send actions or useDispatch) is AppDispatch