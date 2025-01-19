'use client'

import { useState, useEffect } from 'react'
import EtablissementForm from './components/EtablissementForm'
import { Button } from '@/components/ui/button'

interface Etablissement {
  id: string
  nom: string
  ville: string
  telephone: string
  numeroRue: string
  nomRue: string
  codePostal: string
  logoUrl?: string
}

async function fetchEtablissements() {
  const response = await fetch('/api/etablissements')
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des établissements')
  }
  return response.json()
}

export default function EtablissementsPage() {
  const [showForm, setShowForm] = useState(false)
  const [etablissements, setEtablissements] = useState<Etablissement[]>([])
  const [selectedEtablissement, setSelectedEtablissement] = useState<Etablissement>()
  const [isLoading, setIsLoading] = useState(true)

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

  const handleEdit = (etablissement: Etablissement) => {
    setSelectedEtablissement(etablissement)
    setShowForm(true)
  }

  const handleSave = (newEtablissement: Etablissement) => {
    if (selectedEtablissement) {
      // Mise à jour d'un établissement existant
      setEtablissements(prev => 
        prev.map(e => e.id === newEtablissement.id ? newEtablissement : e)
      )
    } else {
      // Création d'un nouvel établissement
      setEtablissements(prev => [...prev, newEtablissement])
    }
    setShowForm(false)
    setSelectedEtablissement(undefined)
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
    } catch (error) {
      console.error('Erreur suppression établissement', error)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Référentiel des établissements</h1>
      
      <div className="space-y-6">
        <Button onClick={handleCreate}>Créer un établissement</Button>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow">
            <EtablissementForm 
              etablissement={selectedEtablissement}
              onSave={handleSave} 
            />
          </div>
        )}

        {etablissements.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Liste des établissements</h2>
            <div className="space-y-4">
              {etablissements.map(etablissement => (
                <div key={etablissement.id} className="border p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <div className="font-medium">{etablissement.nom}</div>
                    <div className="text-sm text-gray-600">{etablissement.ville}</div>
                    <div className="text-sm text-gray-600">{etablissement.telephone}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="secondary"
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() => handleEdit(etablissement)}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="destructive" 
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handleDelete(etablissement.id)}
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
