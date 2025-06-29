import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { manageEvent } from "../../store/userSlice"
import toast from "react-hot-toast"
import { useEffect } from "react"

export default function Event() {
    const [eventData, setEvent] = useState({ title: "", date: "", location: "", description: "" })
    const { eventsCreated, status } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const { eventId } = useParams()

    useEffect(() => {
        if ((eventId)) {
            const eventDetails = eventsCreated.find((event) => event._id === eventId)
            setEvent(eventDetails)
        }
    }, [eventId])

    function handlerOnChange(e) {
        const { name, value } = e.target
        setEvent(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function handlerEvent(e) {
        e.preventDefault()

        try {
            const response = await dispatch(manageEvent(eventData)).unwrap()
            if (response?.success) {
                setEvent({ title: "", date: "", location: "", description: "" })
                toast.success(response?.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error)
        }

    }
    return (
        <>

            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow-2xl rounded-3xl sm:p-10">
                        <div className="max-w-md mx-auto">
                            <div className="flex items-center space-x-5">
                                <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">i</div>
                                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                                    <h2 className="leading-relaxed">{eventId ? "Update Event" : "Create an Event"}</h2>
                                    <p className="text-sm text-gray-500 font-normal leading-relaxed">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                                </div>
                            </div>
                            <form onSubmit={handlerEvent}>
                                <div className="divide-y divide-gray-200">
                                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                        <div className="flex flex-col">
                                            <label htmlFor="title" className="leading-loose">Title<sup>*</sup> </label>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                value={eventData?.title}
                                                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                placeholder="Event title"
                                                onChange={handlerOnChange}
                                            />
                                        </div>

                                        <div className="flex max-sm:flex-wrap max-sm:space-y-4 items-center space-x-4 ">
                                            <div className="flex flex-col justify-center w-full">
                                                <label htmlFor="eventDate" className="leading-loose">Date<sup>*</sup> </label>
                                                <div className=" focus-within:text-gray-600 text-gray-400">
                                                    <input type="date"
                                                        id="eventDate"
                                                        name="date"
                                                        value={eventData?.date}
                                                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                        placeholder="DD/MM/YYYY"
                                                        onChange={handlerOnChange}
                                                    />

                                                </div>
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <label htmlFor="location" className="leading-loose">Location<sup>*</sup> </label>
                                                <div className=" focus-within:text-gray-600 text-gray-400">
                                                    <input
                                                        type="text"
                                                        id="location"
                                                        name="location"
                                                        value={eventData?.location}
                                                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                        placeholder="Enter location"
                                                        onChange={handlerOnChange}
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="description" className="leading-loose">Event Description<sup>*</sup> </label>
                                            <textarea
                                                type="text"
                                                id="description"
                                                name="description"
                                                value={eventData?.description}
                                                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                placeholder="Write event description..."
                                                onChange={handlerOnChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="pt-4 flex items-center space-x-4">
                                        <Link
                                            to={-1}
                                            className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
                                            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg> Cancel
                                        </Link>
                                        <button
                                            className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none cursor-pointer"
                                            disabled={status === "loading"}
                                            >

                                            {status === "loading" ?  "Creating..." : "Create"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}