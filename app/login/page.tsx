'use client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const LoginPage = () => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const router = useRouter()

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => 
        {
            e.preventDefault()

            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            if (res?.error) {
                console.log(res.error)
            } else {
                router.push("/")
            }
        }
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-rose-50 dark:from-slate-900 dark:via-slate-800 p-6">
      <div className="w-full max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-lg p-8">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300">Welcome back</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Sign in to your account to continue</p>
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
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
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
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </label>

          <button
            type="submit"
            className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Don't have an account? <a href="/register" className="text-indigo-600 dark:text-indigo-300 font-medium hover:underline">Register</a>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
