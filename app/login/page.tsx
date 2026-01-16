'use client'

import { useAuth } from '@/hooks/auth-context'
import { Sparkles } from 'lucide-react'

export default function LoginForm() {
  const { signInWithGoogle, loading } = useAuth()


  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        {/* Main Login Card */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg float">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
              Smart D
            </h1>
            <p className="text-slate-600 font-medium">
              Your one-stop shop for delicious desserts delivered to your door.
            </p>
          </div>


          
          {/* Google Sign In Button */}
          <button
            onClick={signInWithGoogle}
            disabled={loading }
            className="w-full flex items-center justify-center gap-3 px-3 py-2 bg-white border-2 border-slate-200 rounded-2xl text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl group"
          >
            <div className="relative">
              <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            <span>
              {loading 
                ? 'Signing in...'
                : 'Continue with Google'}
            </span>
          </button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500 font-medium">Or explore features</span>
            </div>
          </div>

          {/* Guest Mode */}
          <div className="text-center">
            <p className="text-sm text-slate-600 mb-4">
              {/* {isSupabaseConfigured ? "Demo Mode Available" : "Set up Supabase to get started"} */}
            </p>
            {/* {isSupabaseConfigured && (
              <button
                onClick={() => {}}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-xl transition-all duration-200"
              >
                <LogIn className="w-4 h-4" />
                Continue as Guest
              </button>
            )} */}
          </div>
        </div>

        {/* Features Grid */}
        

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500 font-medium">
            Built with Next.js 15 + Supabase + TypeScript
          </p>
          <div className="flex justify-center gap-2 mt-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-slate-400">Real-time ready</span>
          </div>
        </div>
      </div>
    </div>
  )
}