import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { EVENT_API, LOGIN_API, SIGNUP_API, USER_EVENT_JOINED_API, USER_EVENT_REGISTRATION_API } from '../utils/api'


export const userSignup = createAsyncThunk('user/signup', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(SIGNUP_API, data, { withCredentials: true })
        return response?.data
    } catch (error) {
        const message = error?.response?.data?.message
        return rejectWithValue(message)
    }
})

export const userLogin = createAsyncThunk('user/Login', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(LOGIN_API, data, { withCredentials: true })
        return response?.data
    } catch (error) {
        const message = error?.response?.data?.message
        return rejectWithValue(message)
    }
})

export const manageEvent = createAsyncThunk('user/manageEvent', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(EVENT_API, data, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            },
            withCredentials: true
        })
        return response?.data
    } catch (error) {
        const message = error?.response?.data?.message
        return rejectWithValue(message)
    }
})

export const getUserJoinedEvents = createAsyncThunk('user/getUserJoinedEvents', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(USER_EVENT_JOINED_API, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            },
            withCredentials: true
        })
        return response?.data.events
    } catch (error) {
        const message = error?.response?.data?.message
        return rejectWithValue(message)
    }
})

export const registerInEvent = createAsyncThunk('user/registerInEvent', async (eventId, { rejectWithValue }) => {
    try {
        const response = await axios.post(USER_EVENT_REGISTRATION_API, { eventId }, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            },
            withCredentials: true
        })
        return response?.data?.event
    } catch (error) {
        const message = error?.response?.data?.message
        return rejectWithValue(message)
    }
})

const initialState = {
    user: sessionStorage.getItem('user') !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')) : {},
    eventsCreated: sessionStorage.getItem('eventsCreated') !== 'undefined' ? JSON.parse(sessionStorage.getItem('eventsCreated')) : [],
    eventsJoined: sessionStorage.getItem('eventsJoined') !== 'undefined' ? JSON.parse(sessionStorage.getItem('eventsJoined')) : [],
    token: sessionStorage.getItem('token') || null,
    status: 'idle',
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload
        },
        setStatus: (state, { payload }) => {
            state.status = payload
        },
        clearSlice: (state) => {
            state.user = null
            state.token = null
            state.eventsCreated = []
            state.eventsJoined = []
            state.status = 'idle'
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userSignup.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(userSignup.fulfilled, (state, { payload }) => {
                state.user = payload?.user
                state.token = payload?.token
                // state.eventsCreated = payload?.user?.eventsCreated
                // state.eventsJoined = payload?.user?.eventsJoined
                sessionStorage.setItem('user', JSON.stringify(payload?.user))
                // sessionStorage.setItem('eventsCreated', JSON.stringify(payload?.user?.eventsCreated))
                // sessionStorage.setItem('eventsJoined', JSON.stringify(payload?.user?.eventsJoined))
                sessionStorage.setItem('token', payload.token)
                state.status = 'success'
            })
            .addCase(userSignup.rejected, (state, { payload }) => {
                state.status = 'error'
                state.error = payload
            })
            .addCase(userLogin.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(userLogin.fulfilled, (state, { payload }) => {
                state.user = payload?.user
                state.token = payload.token
                state.eventsCreated = payload?.user?.eventsCreated || []
                state.eventsJoined = payload?.user?.eventsJoined || []
                sessionStorage.setItem('user', JSON.stringify(payload?.user))
                sessionStorage.setItem('eventsCreated', JSON.stringify(payload?.user?.eventsCreated))
                sessionStorage.setItem('eventsJoined', JSON.stringify(payload?.user?.eventsJoined))
                sessionStorage.setItem('token', payload.token)
                state.status = 'success'
            })
            .addCase(userLogin.rejected, (state, { payload }) => {
                state.status = 'error'
                state.error = payload
            })
            .addCase(manageEvent.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(manageEvent.fulfilled, (state, { payload }) => {
                const eventIndex = state.eventsCreated.findIndex((event) => event._id === payload?.event?._id)
                if (eventIndex === -1) {
                    state.eventsCreated.push(payload?.event)
                } else {
                    state.eventsCreated = state.eventsCreated.map((event) => event._id === payload?.event?._id ? payload?.event : event)
                }

                sessionStorage.setItem('eventsCreated', JSON.stringify(state.eventsCreated))
                state.status = 'success'
            })
            .addCase(manageEvent.rejected, (state, { payload }) => {
                state.status = 'error'
                state.error = payload
            })
            .addCase(getUserJoinedEvents.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getUserJoinedEvents.fulfilled, (state, { payload }) => {
                state.eventsJoined = payload
                sessionStorage.setItem('eventsJoined', JSON.stringify(state.eventsJoined))
                state.status = 'success'
            })
            .addCase(getUserJoinedEvents.rejected, (state, { payload }) => {
                state.status = 'error'
                state.error = payload
            })
            .addCase(registerInEvent.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(registerInEvent.fulfilled, (state, { payload }) => {
                state.status = 'success'
                state.eventsJoined = Array.isArray(state.eventsJoined) ? [...state.eventsJoined, payload] : [payload]
                sessionStorage.setItem('eventsJoined', JSON.stringify(state.eventsJoined))
            })
            .addCase(registerInEvent.rejected, (state, { payload }) => {
                state.status = 'error'
                state.error = payload
            })
    }
})

export const { setUser, setStatus, clearSlice } = userSlice.actions
export default userSlice.reducer