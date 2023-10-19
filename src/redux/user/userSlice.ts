import { createSlice } from '@reduxjs/toolkit';
import { getDatabase, ref, get } from "firebase/database";
import { AppDispatch } from '../store';
import { auth } from '../../firebase';

const initialState: UserState = {
    users: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        GET_ALL_USERS: (state, action) => {
            state.users = action.payload
        },
    },
})

export const { GET_ALL_USERS } = userSlice.actions;

export const getUsers = () => async (dispatch: AppDispatch) => {
   
    try {
        const dbRef = ref(getDatabase(), `users/`);
        const snapshot = await get(dbRef);
        const loginUID = auth.currentUser?.uid
        if (snapshot.exists()) {
            const usersData = Object.values(snapshot.val()).filter((user: any) => user.uid !== loginUID);
            dispatch(GET_ALL_USERS(usersData))
        } else {
            console.log("No data available");
        }
    } catch (e) {
        console.log("e=======>", e);
    }
};

export default userSlice.reducer;