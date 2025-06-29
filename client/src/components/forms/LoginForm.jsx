import { useState } from "react";
import AuthButton from "../buttons/AuthButton";
import { useDispatch } from "react-redux";
import { userLogin } from "../../store/userSlice";

export default function LoginForm() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const dispatch = useDispatch()

    function handleChange(e) {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }
    return <>
        <section className="">
            <div>
                <form className="space-y-6 " action="#">
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
                            placeholder="******"
                            className="bg-gray-50 border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            required=""
                            onChange={handleChange}
                        />
                    </div>

                    <AuthButton dispatch={dispatch} action={userLogin} text="Login" userData={loginData} clearData={setLoginData}  loadingText={"Logging in..."} />

                </form>
            </div>
        </section>
    </>
}