import { Link } from "react-router-dom"
import eventPilot_logo from "../assets/eventPilot_logo.png"
import { useSelector } from "react-redux"

export default function Header() {
    const {token, user} = useSelector((state) => state.user)
    return (
        <header className="border-b-2 h-15 flex items-center border-gray-200 bg-white shadow-m sticky top-0 z-50">
            <div className="w-11/12 mx-auto  flex justify-between items-center py-2 px-2">
                <Link to={"/"} className=" " >
                    <img src={eventPilot_logo} alt="eventPilot_logo icon" className='sm:w-[10rem] w-[8rem]  transition-all duration-500 ease-in-out' />
                </Link>
                {
                    token && <Link to={"/dashboard"} className="rounded-full" >
                        <img src={user?.profileImage} alt="user avatar icon"
                            className='sm:w-[2.5rem] sm:h-[2.5rem] w-[2rem] h-[2rem] transition-all duration-500 ease-in-out rounded-full border size-32'
                        />
                    </Link>
                }
            </div>
        </header>

    )
}