import { useState } from 'react'

import './App.css'
import LoginForm from './components/forms/LoginForm'
import SignUpForm from './components/forms/SignupForm'
import Header from './components/Header'

function App() {
  const [formType, setFormType] = useState("login")

  const formLogin = "login"
  const formSignup = "signup"

  return (
    <>
      <Header />
      <section className="w-11/12 mx-auto h-screen flex justify-center items-center">
        <div className="rounded-2xl my-3 border-2 border-blue-200 shadow-2xl p-3" style={{ width: "30rem" }}>
          {/* Top */}
          <div className="text-center mt-2 ">
            <h2 className='text-2xl font-semibold my-2 font-serif' >Welcome Back</h2>
            <div className='font-serif '>
              <div>Signup or login to manage your Events</div>
              
            </div>
            <div className="flex justify-center mt-3 ">
              <div className={`w-full py-2 font-semibold ${formType === formLogin ? " text-green-800  border-green-800  border-b-3" : ""} `}
                style={{ cursor: "pointer" }}
                onClick={() => setFormType("login")}
              >
                Login
              </div>
              <div className={`w-full py-2 font-semibold ${formType !== "login" ? " text-green-800  border-green-800  border-b-3" : ""} `}
                style={{ cursor: "pointer" }}
                onClick={() => setFormType("signup")}
              >
                Sign Up
              </div>
            </div>
          </div>
          {/* Form */}
          <div className="bg-gray-100">
            <div className="mx-3 py-4">

              {
                formType === formLogin ? (<LoginForm />) : (<SignUpForm />)
              }
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
