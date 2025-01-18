'use client'

import { useEffect, useState, useRef } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

export default function InactivityTimer() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [showWarning, setShowWarning] = useState(false)
  const INACTIVITY_LIMIT = 15 * 60 * 1000 // 15 minutes
  const WARNING_TIME = 5 * 60 * 1000 // 5 minutes
  const activityTimer = useRef<NodeJS.Timeout>()
  const warningTimer = useRef<NodeJS.Timeout>()

  const resetTimer = () => {
    // Clear existing timers
    if (activityTimer.current) clearTimeout(activityTimer.current)
    if (warningTimer.current) clearTimeout(warningTimer.current)

    // Set new warning timer
    warningTimer.current = setTimeout(() => {
      setShowWarning(true)
    }, INACTIVITY_LIMIT - WARNING_TIME)

    // Set new activity timer
    activityTimer.current = setTimeout(() => {
      handleLogout()
    }, INACTIVITY_LIMIT)
  }

  useEffect(() => {
    return () => {
      if (activityTimer.current) clearTimeout(activityTimer.current)
      if (warningTimer.current) clearTimeout(warningTimer.current)
    }
  }, [])

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/auth/login')
    } catch (error) {
      console.error('Logout error:', error)
      // Fallback to redirect if logout fails
      router.push('/auth/login')
    }
  }

  const handleStayLoggedIn = () => {
    setShowWarning(false)
    resetTimer()
  }

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
    
    // Add event listeners
    const handleActivity = () => {
      resetTimer()
      setShowWarning(false)
    }
    
    events.forEach(event => {
      window.addEventListener(event, handleActivity)
    })

    return () => {
      // Cleanup
      events.forEach(event => {
        window.removeEventListener(event, handleActivity)
      })
      if (activityTimer.current) clearTimeout(activityTimer.current)
      if (warningTimer.current) clearTimeout(warningTimer.current)
    }
  }, [])

  return (
    <>
      {showWarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Alert className="max-w-md">
            <AlertTitle>Attention</AlertTitle>
            <AlertDescription>
              Vous serez déconnecté dans 5 minutes en raison de l'inactivité.
            </AlertDescription>
            <div className="mt-4 flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={handleStayLoggedIn}
              >
                Rester connecté
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleLogout}
              >
                Déconnexion
              </Button>
            </div>
          </Alert>
        </div>
      )}
    </>
  )
}
