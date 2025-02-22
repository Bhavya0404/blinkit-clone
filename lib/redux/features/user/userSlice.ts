import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    userId: string | null;
}

const initialState: UserState = {
    userId: null
}

export const userSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        getUser: (state: UserState) => {
            const user = sessionStorage.getItem('user')
            if(user){
                state.userId = JSON.parse(user);
            }
        }, 
        setUser: (state: UserState, action: PayloadAction<string | null>) => {
            if(action.payload){
                sessionStorage.setItem('user', JSON.stringify(action.payload))
                state.userId = action.payload;
            } else {
                sessionStorage.removeItem('user')
                state.userId = null;
            }
        }
    }

})

export const {getUser, setUser} = userSlice.actions
export default userSlice.reducer