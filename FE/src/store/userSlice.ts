// src/store/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, fetchUsersPaginated, updateUser, deleteUser } from './userThunk';

interface UserState {
    users: UserWithoutPassword[];
    usersPaginated: UserWithoutPassword[];
    loading: boolean;
    error: string | null;
    totalUsers: number;
}

const initialState: UserState = {
    users: [],
    usersPaginated: [],
    loading: false,
    error: null,
    totalUsers: 0,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload as UserWithoutPassword[];
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(fetchUsersPaginated.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsersPaginated.fulfilled, (state, action) => {
                state.loading = false;
                state.usersPaginated = action.payload.users as UserWithoutPassword[];
                state.totalUsers = action.payload.total as number;
            })
            .addCase(fetchUsersPaginated.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const updatedUser = action.payload as UserWithoutPassword;
                state.usersPaginated = state.usersPaginated.map((user) =>
                    user.id === updatedUser.id ? updatedUser : user
                );
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const deletedUserId = action.payload as UserWithoutPassword;
                const index = state.users.findIndex((user) => user.id === deletedUserId.id);
                if (index !== -1) {
                    state.users[index] = deletedUserId;
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default userSlice.reducer;
