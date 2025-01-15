'use client'

import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import {
  ClipboardList,
  ShieldCheck,
  Wrench,
  Calendar,
  Ticket,
  Lock,
  Settings,
  Bell
} from 'lucide-react'

export default function Navbar() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <nav className="bg-[#0B2228] p-2">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-6">
          <Image 
            src="/logo-os.jpg" 
            alt="Logo OS" 
            width={40} 
            height={40}
            className="mr-4 rounded-full"
          />
          {/* Menu Autorisations et accès */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 text-white hover:text-[#35BDB6] transition-colors"
            >
              <Lock className="h-5 w-5" />
              <span>Autorisations et accès</span>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg">
                <div className="p-2">
                  <Link
                    href="/configuration-permissions"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Configuration des permissions</span>
                  </Link>
                  <Link
                    href="/parametrage-alertes"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <Bell className="h-4 w-4" />
                    <span>Paramétrage des alertes</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Menu Gestion Sécurité */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 text-white hover:text-[#35BDB6] transition-colors"
            >
              <ShieldCheck className="h-5 w-5" />
              <span>Gestion Sécurité</span>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg">
                <div className="p-2">
                  <Link
                    href="/rapport-securite"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <ClipboardList className="h-4 w-4" />
                    <span>Rapport de sécurité</span>
                  </Link>
                  <Link
                    href="/controles-periodiques"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <Wrench className="h-4 w-4" />
                    <span>Contrôles périodiques</span>
                  </Link>
                  <Link
                    href="/suivi-equipements"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>Suivi des équipements</span>
                  </Link>
                  <Link
                    href="/creation-tickets"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <Ticket className="h-4 w-4" />
                    <span>Création de tickets travaux</span>
                  </Link>
                  <Link
                    href="/planification-conges"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Planification des congés</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>
        <button
          onClick={handleSignOut}
          className="bg-white text-[#0B2228] px-4 py-2 rounded hover:bg-[#35BDB6] hover:text-white transition-colors"
        >
          Déconnexion
        </button>
      </div>
    </nav>
  )
}
