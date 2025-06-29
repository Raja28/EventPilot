import { MdGroupAdd } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa6";
import { BsPersonWorkspace } from "react-icons/bs";
import { TbUsersGroup } from "react-icons/tb";
import { MdOutlineEventSeat } from "react-icons/md";
import { IoIosList } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { user } = useSelector(state => state.user)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    function logouthandler() {
        sessionStorage.clear()
        dispatch(clearSlice())
        navigate("/")
    }

    return (
        <>

            <section className="w-11/12 mx-auto px-3 flex justify-center items-center py-3 mt-3">
                <div className="flex flex-col lg:flex-row gap-6 mx-2 w-full justify-center">
                    {/* Left */}
                    <div className="max-w-xs w-full border shadow-2xl p-4 rounded-2xl mx-auto">
                        <div className="w-20 h-20 rounded-full overflow-hidden mx-auto">
                            <img
                                src={user?.profileImage}
                                alt="user image"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <div className="my-4 w-full text-center">
                            <div className="flex gap-2 justify-center">
                                <p><strong>Name:</strong></p>
                                <p>{user?.name}</p>
                            </div>
                            <div className="flex gap-2 justify-center">
                                <p><strong>Email:</strong></p>
                                <p>{user?.email}</p>
                            </div>
                            <div className="mt-3">
                                <button
                                    onClick={logouthandler}
                                    className="bg-red-600 text-white py-1 px-4 rounded w-full text-sm hover:bg-red-700 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex-1 w-full border shadow-2xl p-6 rounded-2xl">
                        <div>
                            <p className="text-gray-500">
                                Events Details: <small className="text-gray-400 text-xs">(Click for action)</small>
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 mt-4">
                            <Link
                                to="/dashboard/event/registered"
                                className="w-32 border border-yellow-500 p-3 rounded-xl text-center text-gray-700 hover:bg-yellow-50 transition"
                            >
                                <div className="flex flex-col text-sm mb-2">
                                    <span>Events</span>
                                    <span>Registered</span>
                                </div>
                                <div className="w-6 h-6 mx-auto">
                                    <FaWpforms className="w-full h-full" />
                                </div>
                            </Link>

                            <Link
                                to=""
                                className="w-32 border border-yellow-500 p-3 rounded-xl text-center text-gray-700 hover:bg-yellow-50 transition"
                            >
                                <div className="flex flex-col text-sm mb-2">
                                    <span>Events</span>
                                    <span>Created</span>
                                </div>
                                <div className="w-6 h-6 mx-auto">
                                    <TbUsersGroup className="w-full h-full" />
                                </div>
                            </Link>

                            <Link
                                to="/dashboard/event"
                                className="w-32 border border-yellow-500 p-3 rounded-xl text-center text-gray-700 hover:bg-yellow-50 transition"
                            >
                                <div className="flex flex-col text-sm mb-2">
                                    <span>Create</span>
                                    <span>Event</span>
                                </div>
                                <div className="w-6 h-6 mx-auto">
                                    <MdOutlineEventSeat className="w-full h-full" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}