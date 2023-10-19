import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { getDatabase, ref, set } from "firebase/database";

// interface RegistrationData {
//   inputedName: string;
//   inputedEmail: string;
//   inputedPassword: string;
// }

export const registerUser = createAsyncThunk('auth/registerUser', async (userData: RegistrationData) => {
  try {
    const authUser = await createUserWithEmailAndPassword(auth, userData.inputedEmail, userData.inputedPassword)
    const newUser = {
      uid: authUser.user.uid,
      email: authUser.user.email,
      name: userData.inputedName,
    };
    const db = getDatabase();
    set(ref(db, 'users/' + authUser.user.uid), {
      uid: authUser.user.uid,
      email: authUser.user.email,
      name: userData.inputedName,
    }).catch((error) => {
      console.log("error", error)
    })

    return newUser;
  } catch (error) {
    console.log("error --> ", error)
  }
}
);