import axios from "axios"
import { EVENT_API } from "../utils/api"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useCallback } from "react"
import { useState } from "react"

export const useFetch = () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchEvents = useCallback(async (query = {}) => {
        try {
            setError(null)
            setLoading(true)
            const response = await axios.get(EVENT_API, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                },

            })

            if (response?.data?.success) {
                setEvents(response.data?.events)

            } else {
                setError(response?.data?.message)
            }

        } catch (error) {
            console.log(error);
            setError(error?.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }, [])

    // useEffect(() => {
    //     fetchEvents()
    // }, [])
    return { loading, error, events, fetchEvents }
}