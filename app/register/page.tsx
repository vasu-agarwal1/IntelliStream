'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const RegisterPage = () => {
  //apply debouncing later
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('') 
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => 
      {
        e.preventDefault()

        if(password !== confirmPassword){
          alert("password do not match")
          return
        }

        try {
          const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password
            })
          })
          const data = await res.json()

          if(!res.ok){
            throw new Error(data.error || "Reg. Failed")
          }

          console.log(data)
          router.push("/login")
        } catch (error) {
          console.error(error)
        }
      }


  return (
  <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-rose-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 p-6">
      <div className="w-full max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-lg p-8">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold text-rose-600 dark:text-rose-300">Create account</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Sign up to get access to IntelliStream</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="sr-only">Email</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
            />
          </label>

          <label className="block">
            <span className="sr-only">Password</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
            />
          </label>

          <label className="block">
            <span className="sr-only">Confirm Password</span>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
            />
          </label>

          <button
            type="submit"
            className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium transition"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account? <a href="/login" className="text-rose-600 dark:text-rose-300 font-medium hover:underline">Login</a>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
