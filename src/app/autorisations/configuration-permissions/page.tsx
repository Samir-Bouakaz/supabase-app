'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Checkbox } from '@/components/ui/checkbox'
import type { CheckedState } from '@radix-ui/react-checkbox'

interface User {
  id: string
  email: string
  full_name: string
}

interface Page {
  path: string
  name: string
}

interface Permission {
  userId: string
  pagePath: string
  access: boolean
  create: boolean
  read: boolean
  update: boolean
  delete: boolean
}

export default function ConfigurationPermissionsPage() {
  const supabase = createClientComponentClient()
  const [users, setUsers] = useState<User[]>([])
  const [pages, setPages] = useState<Page[]>([])
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [loading, setLoading] = useState(true)

  // Récupérer les utilisateurs et les pages au montage
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les utilisateurs
        const { data: usersData } = await supabase
          .from('users')
          .select('id, email, full_name')
        
        // Récupérer les pages disponibles
        const pagesData = [
          { path: '/autorisations/configuration-permissions', name: 'Configuration des permissions' },
          { path: '/autorisations/parametrage-alertes', name: 'Paramétrage des alertes' },
          // Ajouter d'autres pages ici
        ]

        // Récupérer les permissions existantes
        const { data: permissionsData } = await supabase
          .from('permissions')
          .select('*')

        setUsers(usersData || [])
        setPages(pagesData)
        setPermissions(permissionsData || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Trouver ou créer une permission
  const getPermission = (userId: string, pagePath: string) => {
    const existing = permissions.find(p => 
      p.userId === userId && p.pagePath === pagePath
    )
    
    return existing || {
      userId,
      pagePath,
      access: false,
      create: false,
      read: false,
      update: false,
      delete: false
    }
  }

  // Mettre à jour une permission
  const updatePermission = async (permission: Permission) => {
    try {
      const { error } = await supabase
        .from('permissions')
        .upsert(permission)
      
      if (error) throw error

      // Mettre à jour l'état local
      setPermissions(prev => {
        const existingIndex = prev.findIndex(p => 
          p.userId === permission.userId && p.pagePath === permission.pagePath
        )
        
        if (existingIndex >= 0) {
          const newPermissions = [...prev]
          newPermissions[existingIndex] = permission
          return newPermissions
        }
        
        return [...prev, permission]
      })
    } catch (error) {
      console.error('Error updating permission:', error)
    }
  }

  if (loading) {
    return <div className="p-6">Chargement...</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Configuration des permissions</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pages
              </th>
              {users.map(user => (
                <th key={user.id} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {user.full_name || user.email}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pages.map(page => (
              <tr key={page.path}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {page.name}
                </td>
                
                {users.map(user => {
                  const permission = getPermission(user.id, page.path)
                  return (
                    <td key={user.id} className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-2">
                        {/* Checkbox d'accès global */}
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`access-${user.id}-${page.path}`}
                            checked={permission.access}
                            onCheckedChange={(checked: CheckedState) => {
                              const newPermission = {
                                ...permission,
                                access: !!checked,
                                create: !!checked ? permission.create : false,
                                read: !!checked ? permission.read : false,
                                update: !!checked ? permission.update : false,
                                delete: !!checked ? permission.delete : false
                              }
                              updatePermission(newPermission)
                            }}
                          />
                          <label htmlFor={`access-${user.id}-${page.path}`} className="text-sm">
                            Accès
                          </label>
                        </div>

                        {/* Checkboxes CRUD */}
                        {permission.access && (
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`create-${user.id}-${page.path}`}
                                checked={permission.create}
                                onCheckedChange={(checked: CheckedState) => {
                                  updatePermission({
                                    ...permission,
                                    create: !!checked
                                  })
                                }}
                              />
                              <label htmlFor={`create-${user.id}-${page.path}`} className="text-sm">
                                Créer
                              </label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`read-${user.id}-${page.path}`}
                                checked={permission.read}
                                onCheckedChange={(checked: CheckedState) => {
                                  updatePermission({
                                    ...permission,
                                    read: !!checked
                                  })
                                }}
                              />
                              <label htmlFor={`read-${user.id}-${page.path}`} className="text-sm">
                                Lire
                              </label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`update-${user.id}-${page.path}`}
                                checked={permission.update}
                                onCheckedChange={(checked: CheckedState) => {
                                  updatePermission({
                                    ...permission,
                                    update: !!checked
                                  })
                                }}
                              />
                              <label htmlFor={`update-${user.id}-${page.path}`} className="text-sm">
                                Modifier
                              </label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`delete-${user.id}-${page.path}`}
                                checked={permission.delete}
                                onCheckedChange={(checked: CheckedState) => {
                                  updatePermission({
                                    ...permission,
                                    delete: !!checked
                                  })
                                }}
                              />
                              <label htmlFor={`delete-${user.id}-${page.path}`} className="text-sm">
                                Supprimer
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
