import { useState } from "react";
import {useDispatch} from "react-redux"
import AuthButton from "../buttons/AuthButton";
import { userSignup } from "../../store/userSlice";

export default function SignUpForm() {
    const [signupData, setSignupData] = useState({})
    const dispatch = useDispatch()

    function handleChange(e) {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <section className="">
                <div>
                    <form className="space-y-6 " action="#">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your name <sup>*</sup></label>
                            <input type="text" name="name" id="name"
                                className=" border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                placeholder="john doe"
                                required=""
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email <sup>*</sup></label>
                            <input type="email" name="email" id="email"
                                className=" border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                placeholder="name@company.com"
                                required=""
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password<sup>*</sup></label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                required=""
                                onChange={handleChange}
                            />
                        </div>

                        <AuthButton dispatch={dispatch} action={userSignup} userData={signupData} text="Signin" loadingText={"Signing up..."}  clearData={setSignupData}/>

                    </form>
                </div>
            </section>
        </>
    )
}