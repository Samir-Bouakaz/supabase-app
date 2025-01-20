'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { EtablissementForm } from './components/EtablissementForm'

interface Etablissement {
  id: string
  nom: string
  ville: string
  telephone: string
  numero?: number
  rue: string
  codePostal: string
  logo?: string
}

async function fetchEtablissements() {
  const response = await fetch('/api/etablissements')
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des établissements')
  }
  return response.json()
}

export default function EtablissementsPage() {
  const [etablissements, setEtablissements] = useState<Etablissement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selectedEtablissement, setSelectedEtablissement] = useState<Etablissement>()

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchEtablissements()
        setEtablissements(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])


  const handleCreate = () => {
    setSelectedEtablissement(undefined)
    setShowForm(true)
  }

  const handleSave = async (formData: any) => {
    try {
      const method = selectedEtablissement ? 'PUT' : 'POST'
      const url = '/api/etablissements' + (selectedEtablissement ? `/${selectedEtablissement.id}` : '')
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde')
      }

      const data = await response.json()
      setEtablissements(prev => {
        if (selectedEtablissement) {
          return prev.map(e => e.id === data.id ? data : e)
        }
        return [...prev, data]
      })
      
      setShowForm(false)
    } catch (error) {
      console.error('Erreur sauvegarde établissement', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/etablissements', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression')
      }

      setEtablissements(prev => prev.filter(e => e.id !== id))
      setShowForm(false)
    } catch (error) {
      console.error('Erreur suppression établissement', error)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Référentiel des établissements</h1>
      
      <Button 
        onClick={handleCreate}
        className="bg-blue-500 hover:bg-blue-600 text-white mb-4"
      >
        Créer un établissement
      </Button>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-4">
          <EtablissementForm
            initialData={selectedEtablissement}
            onSave={handleSave}
            onDelete={selectedEtablissement ? () => handleDelete(selectedEtablissement.id) : undefined}
          />
        </div>
      )}
    </div>
  )
}
