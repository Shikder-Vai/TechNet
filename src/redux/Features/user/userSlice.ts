import { auth } from '@/lib/firebase';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword } from 'firebase/auth';
// import type { PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  user: {
    email: string | null;
  };
  isLoading: boolean;
  isError: boolean;
  Error: string | null;
}

interface ICredintial {
  email: string;
  password: string;
}

const initialState: IUserState = {
  user: {
    email: null,
  },
  isLoading: false,
  isError: false,
  Error: null,
};

export const createUser = createAsyncThunk(
  'user/createUser',
  async ({ email, password }: ICredintial) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);

    return data?.user?.email;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, () => {})
      .addCase(createUser.rejected, () => {});
  },
});

export const userReducer = userSlice.reducer;
