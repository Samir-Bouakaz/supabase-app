'use client'

import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
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
  LineChart,
  LayoutDashboard,
  BarChart,
  FileText
} from 'lucide-react'

export default function Navbar() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
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
    <nav className="bg-[#0B2228] p-3">
      <div className="container mx-auto flex items-center px-4">
        <div className="flex-none">
          <Image 
            src="/logo-os.jpg" 
            alt="Logo OS" 
            width={40} 
            height={40}
            className="rounded-full"
          />
        </div>
        <div className="flex-1 flex justify-center items-center space-x-6">
          {/* Menu Autorisations et accès */}
          <div className="relative group">
            <button
              className="flex items-center space-x-2 text-white hover:text-[#35BDB6] transition-colors"
            >
              <Lock className="h-5 w-5" />
              <span>Autorisations et accès</span>
            </button>

            <div className="absolute right-0 mt-4 w-64 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 delay-100 group-hover:delay-0 p-2">
                <div className="p-2">
                  <Link
                    href="/auth/autorisations/configuration-permissions"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Configuration des permissions</span>
                  </Link>
                  <Link
                    href="/auth/autorisations/parametrage-alertes"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <Bell className="h-4 w-4" />
                    <span>Paramétrage des alertes</span>
                  </Link>
                </div>
              </div>
          </div>

          {/* Menu Gestion Sécurité */}
          <div className="relative group">
            <button
              className="flex items-center space-x-2 text-white hover:text-[#35BDB6] transition-colors"
            >
              <ShieldCheck className="h-5 w-5" />
              <span>Gestion sécurité</span>
            </button>

            <div className="absolute right-0 mt-4 w-64 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 delay-100 group-hover:delay-0 p-2">
                <div className="p-2">
                  <Link
                    href="/gestion-securite/controles-periodiques"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <Wrench className="h-4 w-4" />
                    <span>Contrôles périodiques</span>
                  </Link>
                  <Link
                    href="/gestion-securite/creation-tickets"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <Ticket className="h-4 w-4" />
                    <span>Création de tickets travaux</span>
                  </Link>
                  <Link
                    href="/gestion-securite/planification-conges"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Planification des congés</span>
                  </Link>
                  <Link
                    href="/gestion-securite/rapport-securite"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <ClipboardList className="h-4 w-4" />
                    <span>Rapport de sécurité</span>
                  </Link>
                  <Link
                    href="/gestion-securite/suivi-equipements"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>Suivi des équipements</span>
                  </Link>
                </div>
              </div>
          </div>

          {/* Menu Pilotage et Analyses */}
          <div className="relative group">
            <button
              className="flex items-center space-x-2 text-white hover:text-[#35BDB6] transition-colors"
            >
              <LineChart className="h-5 w-5" />
              <span>Pilotage et analyses</span>
            </button>

            <div className="absolute right-0 mt-4 w-64 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 delay-100 group-hover:delay-0 p-2 z-50">
                <div className="p-2">
                  <Link
                    href="/pilotage/alertes"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <Bell className="h-4 w-4" />
                    <span>Alertes</span>
                  </Link>
                  <Link
                    href="/pilotage/rapports"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Rapports</span>
                  </Link>
                  <Link
                    href="/pilotage/statistiques"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <BarChart className="h-4 w-4" />
                    <span>Statistiques</span>
                  </Link>
                  <Link
                    href="/pilotage/tableau-de-bord"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Tableau de bord</span>
                  </Link>
                </div>
              </div>
          </div>

          {/* Menu Référentiel des données */}
          <div className="relative group">
            <button
              className="flex items-center space-x-2 text-white hover:text-[#35BDB6] transition-colors"
            >
              <ClipboardList className="h-5 w-5" />
              <span>Référentiel des données</span>
            </button>

            <div className="absolute right-0 mt-4 w-64 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 delay-100 group-hover:delay-0 p-2">
                <div className="p-2">
                  <Link
                    href="/referentiel/agents-prestataire"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <UserIcon className="h-4 w-4" />
                    <span>Agents prestataire de sécurité</span>
                  </Link>
                  <Link
                    href="/referentiel/personnel-bar"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <UserCircle className="h-4 w-4" />
                    <span>Personnel de bar O'Sullivans</span>
                  </Link>
                  <Link
                    href="/referentiel/personnel-securite"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>Personnel de sécurité O'Sullivans</span>
                  </Link>
                  <Link
                    href="/referentiel/societe-prestataire"
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                  >
                    <Building className="h-4 w-4" />
                    <span>Société prestataire de sécurité</span>
                  </Link>
                </div>
              </div>
          </div>
        </div>

        {/* Profile Menu */}
        <div className="relative group">
          <button
              className="flex items-center justify-center text-[#35BDB6] rounded-lg hover:text-[#2a9c96] transition-colors"
          >
            <UserCircle className="h-10 w-10" />
          </button>

            <div className="absolute right-0 mt-4 w-64 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 delay-100 group-hover:delay-0 p-2 z-50">
              <div className="p-4 border-b">
                <p className="text-sm text-gray-600">Bienvenue</p>
                <p className="font-medium">
                  {user?.user_metadata?.full_name || user?.email || 'Utilisateur'}
                </p>
              </div>
              <div className="p-2">
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                >
                  <UserCircle className="h-4 w-4" />
                  <span>Informations personnelles</span>
                </Link>
                <Link
                  href="/notifications"
                  className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-[#35BDB6] hover:text-white rounded-md transition-colors"
                >
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left flex items-center space-x-2 p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            </div>
        </div>
      </div>
    </nav>
  )
}
