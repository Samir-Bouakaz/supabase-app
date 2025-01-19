'use client'

import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import type { User } from '@supabase/supabase-js'
import Image from 'next/image'
import {
  ClipboardList,
  ShieldCheck,
  Wrench,
  Calendar,
  Ticket,
  Lock,
  Settings,
  Bell,
  UserCircle,
  LogOut,
  Building,
  User as UserIcon,
  User as UserIcon2,
  LayoutDashboard,
  BarChart,
  FileText
} from 'lucide-react'

export default function Navbar() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        console.log('User object:', user)
        console.log('User metadata:', user.user_metadata)
        console.log('Identities:', user.identities)
        setUser(user)
      }
    }
    getUser()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  }

  return (
    <nav className="bg-[#0B2228] p-3" ref={navRef}>
      <div className="container mx-auto flex items-center px-4">
        <div className="flex-none">
          <Image 
            src="/osgroup.png"
            alt="Logo OS Group" 
            width={120} 
            height={120}
            className="brightness-0 invert"
          />
        </div>
        <div className="flex-1 flex justify-center items-center space-x-6">
          {/* Menu Autorisations et accès */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 text-white hover:text-[#35BDB6] transition-colors"
              onClick={() => setOpenMenu(openMenu === 'auth' ? null : 'auth')}
            >
              <Lock className="h-5 w-5" />
              <span>Autorisations et accès</span>
            </button>

            <div className={`absolute right-0 mt-4 w-auto min-w-fit bg-white rounded-lg shadow-lg transition-all duration-100 ease-in-out p-2 ${
              openMenu === 'auth' ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
                <div className="p-2 flex flex-wrap">
                  <Link
                    href="/auth/autorisations/configuration-permissions"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <Settings className="h-5 w-5" />
                    <span className="whitespace-nowrap">Configuration des permissions</span>
                  </Link>
                  <Link
                    href="/auth/autorisations/parametrage-alertes"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="whitespace-nowrap">Paramétrage des alertes</span>
                  </Link>
                </div>
              </div>
          </div>

          {/* Menu Gestion Sécurité */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 text-white hover:text-[#35BDB6] transition-colors"
              onClick={() => setOpenMenu(openMenu === 'security' ? null : 'security')}
            >
              <ShieldCheck className="h-5 w-5" />
              <span>Gestion sécurité</span>
            </button>

            <div className={`absolute right-0 mt-4 w-auto min-w-fit bg-white rounded-lg shadow-lg transition-all duration-100 ease-in-out p-2 ${
              openMenu === 'security' ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
                <div className="p-2 flex flex-wrap">
                  <Link
                    href="/gestion-securite/controles-periodiques"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <Wrench className="h-5 w-5" />
                    <span className="whitespace-nowrap">Contrôles périodiques</span>
                  </Link>
                  <Link
                    href="/gestion-securite/creation-tickets"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <Ticket className="h-5 w-5" />
                    <span className="whitespace-nowrap">Création de tickets travaux</span>
                  </Link>
                  <Link
                    href="/gestion-securite/planification-conges"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <Calendar className="h-5 w-5" />
                    <span className="whitespace-nowrap">Planification des congés</span>
                  </Link>
                  <Link
                    href="/gestion-securite/rapport-securite"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <ClipboardList className="h-5 w-5" />
                    <span className="whitespace-nowrap">Rapport de sécurité</span>
                  </Link>
                  <Link
                    href="/gestion-securite/suivi-equipements"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <ShieldCheck className="h-5 w-5" />
                    <span className="whitespace-nowrap">Suivi des équipements</span>
                  </Link>
                </div>
              </div>
          </div>

          {/* Menu Pilotage et analyses */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 text-white hover:text-[#35BDB6] transition-colors"
              onClick={() => setOpenMenu(openMenu === 'pilotage' ? null : 'pilotage')}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Pilotage et analyses</span>
            </button>

            <div className={`absolute right-0 mt-4 w-auto min-w-fit bg-white rounded-lg shadow-lg transition-all duration-100 ease-in-out p-2 ${
              openMenu === 'pilotage' ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
                <div className="p-2 flex flex-wrap">
                  <Link
                    href="/pilotage/tableaux-de-bord"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span className="whitespace-nowrap">Tableaux de bord</span>
                  </Link>
                  <Link
                    href="/pilotage/analyses-statistiques"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <BarChart className="h-5 w-5" />
                    <span className="whitespace-nowrap">Analyses statistiques</span>
                  </Link>
                  <Link
                    href="/pilotage/rapports-consolides"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <FileText className="h-5 w-5" />
                    <span className="whitespace-nowrap">Rapports</span>
                  </Link>
                </div>
              </div>
          </div>

          {/* Menu Référentiel des données */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 text-white hover:text-[#35BDB6] transition-colors"
              onClick={() => setOpenMenu(openMenu === 'referentiel' ? null : 'referentiel')}
            >
              <ClipboardList className="h-5 w-5" />
              <span>Référentiel des données</span>
            </button>

            <div className={`absolute right-0 mt-4 w-auto min-w-fit bg-white rounded-lg shadow-lg transition-all duration-100 ease-in-out p-2 ${
              openMenu === 'referentiel' ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
                <div className="p-2 flex flex-wrap">
                  <Link
                    href="/referentiel/agents-prestataire"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <UserIcon className="h-5 w-5" />
                    <span className="whitespace-nowrap">Agents prestataire de sécurité</span>
                  </Link>
                  <Link
                    href="/referentiel/personnel-bar"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <UserCircle className="h-5 w-5" />
                    <span className="whitespace-nowrap">Personnel de bar O'Sullivans</span>
                  </Link>
                  <Link
                    href="/referentiel/personnel-securite"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <ShieldCheck className="h-5 w-5" />
                    <span className="whitespace-nowrap">Personnel de sécurité O'Sullivans</span>
                  </Link>
                  <Link
                    href="/referentiel/societe-prestataire"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <Building className="h-5 w-5" />
                    <span className="whitespace-nowrap">Société prestataire de sécurité</span>
                  </Link>
                  <Link
                    href="/referentiel/etablissements"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <Building className="h-5 w-5" />
                    <span className="whitespace-nowrap">Établissements</span>
                  </Link>
                </div>
              </div>
          </div>
        </div>

        {/* Profile Menu */}
        <div className="relative">
          <div className="flex items-center space-x-2">
            <button
                className="flex items-center justify-center bg-[#0B2228] text-white rounded-lg hover:text-[#35BDB6] transition-colors"
                onClick={() => setOpenMenu(openMenu === 'profile' ? null : 'profile')}
            >
              <UserCircle className="h-10 w-10" />
            </button>
            <span className="text-white">
              Bonjour {user?.user_metadata?.firstName || 
                      user?.user_metadata?.full_name?.split(' ')[0] || 
                      user?.identities?.[0]?.identity_data?.first_name || 
                      'Utilisateur'}
            </span>
          </div>

            <div className={`absolute right-0 mt-4 w-auto min-w-fit bg-white rounded-lg shadow-lg transition-all duration-100 ease-in-out p-2 z-50 ${
              openMenu === 'profile' ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
              <div className="p-2">
                <Link
                  href="/profil/informations-personnelles"
                  className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                >
                  <UserIcon2 className="h-5 w-5" />
                  <span className="whitespace-nowrap">Informations personnelles</span>
                </Link>
                <Link
                  href="/profil/notifications"
                  className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                >
                  <Bell className="h-5 w-5" />
                    <span className="whitespace-nowrap">Notifications</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left flex items-center space-x-2 p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Déconnexion</span>
                </button>
              </div>
            </div>
        </div>
      </div>
    </nav>
  )
}
