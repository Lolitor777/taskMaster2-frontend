import { createAsyncThunk, createSlice, isRejected, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'

const URL = `${import.meta.env.VITE_URL_SERVER}auth`;


export const fetchLogin = createAsyncThunk('auth/login', async(formData) => {
    try {
        const res = await axios.post(`${URL}/login`, formData)
        if (res.data.ok === false) {
            Swal.fire({
            icon: "error",
            title: "Ups...",  
            text: res.data.msg,
            iconColor: '#e3761d',
            confirmButtonText: 'Vale',
            confirmButtonColor: '#47A8BD'
            });
            return Cookies.remove('token');
        }
        else {
            Cookies.set('token', res.data.token, {expires: 7})
            return res.data
        }

    } catch (error) {
        return isRejectedWithValue( error )
    }
})

export const fetchLogout = createAsyncThunk('auth/logout', async() => {
    try {
        const res = await axios.post(`${URL}/logout`, {}, {
            headers: {
                'x-token': Cookies.get('token')
            }
        })
        Cookies.remove('token');
        return res.data

    } catch (error) {
        return isRejectedWithValue( error )
    }
})

export const fetchValidateToken = createAsyncThunk('auth/validateToken', async() => {
    try {
        const res = await axios.post(`${URL}/renovarToken`, {}, {
            headers: {
                'x-token': Cookies.get('token')
            }
        })
        return res.data
    } catch (error) {
        return isRejectedWithValue( error )
    }
})

const initialState = {
    user: {},
    loading: true
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload;
            state.loading = false;
        },
    },
    extraReducers: ( builder ) => {
        builder
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.loading = false;
            })
            .addCase(fetchLogin.rejected, (state, action)=> {
                state.user = null;
                state.loading = false;
            })
            .addCase(fetchLogout.fulfilled, (state, action) => {
                state.user = null;
                state.loading = false;
            })
            .addCase(fetchLogout.rejected, (state, action)=> {
                state.user = null;
                state.loading = false;
            })
            .addCase(fetchValidateToken.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.loading = false;
            })
            .addCase(fetchValidateToken.rejected, (state, action)=> {
                state.user = null;
                state.loading = false;
            })
    }
})

export const { setLogin } = authSlice.actions

export default authSlice.reducer;