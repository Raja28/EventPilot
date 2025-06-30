const BASEURL = import.meta.env.VITE_BASEURL

export const SIGNUP_API = BASEURL + "/auth/signup"
export const LOGIN_API = BASEURL + "/auth/login"

export const EVENT_API = BASEURL + "/user/event"
export const USER_EVENT_JOINED_API = BASEURL + "/user/event_joined"
export const USER_EVENT_REGISTRATION_API = BASEURL + "/user/event_resgister"
export const USER_CREATED_EVENT_API = BASEURL + "/user/event_created"
