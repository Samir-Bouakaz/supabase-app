'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B2228] to-[#1A4850]">
      <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-96 border border-white/20">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">Connexion</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-400/10 text-red-300 rounded-lg border border-red-400/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 text-white rounded-lg border border-white/10 focus:border-white/30 focus:ring-2 focus:ring-white/20 focus:outline-none transition-all"
              placeholder="Entrez votre email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 text-white rounded-lg border border-white/10 focus:border-white/30 focus:ring-2 focus:ring-white/20 focus:outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-[#35BDB6] to-[#2AA7A1] text-white font-medium rounded-lg hover:from-[#35BDB6]/90 hover:to-[#2AA7A1]/90 transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  )
}
