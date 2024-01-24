import { creaeSlice } from '@reduxjs/toolkit';

export const authSlice = creaeSlice ({
    name: 'auth', 
    initialState: {
        counter: 10
    },
    reducers: {
        increment: (state, ) => {
            state.counter += 1;
        },
    }
});

export const { increment } = authSlice.actions;