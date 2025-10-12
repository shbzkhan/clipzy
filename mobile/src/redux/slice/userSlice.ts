import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../types/auth.types';

interface UserState {
  user: UserData | null;
}
const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userData: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    },

    clearUser: state => {
      state.user = null;
    },
  },
});

export const { userData, clearUser } = userSlice.actions;
export default userSlice.reducer;
