'use client'

import { useState, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import api from '@/lib/api'

interface FormData {
  nom: string
  logo: File | null
  numeroRue: string
  nomRue: string
  codePostal: string
  ville: string
  telephone: string
}

interface EtablissementFormProps {
  etablissement?: {
    id: string
    nom: string
    ville: string
    telephone: string
    numeroRue: string
    nomRue: string
    codePostal: string
    logoUrl?: string
  }
  onSave: (etablissement: {
    id: string
    nom: string
    ville: string
    telephone: string
    numeroRue: string
    nomRue: string
    codePostal: string
    logoUrl?: string
  }) => void
}

export default function EtablissementForm({ etablissement, onSave }: EtablissementFormProps) {
  const [formData, setFormData] = useState<FormData>({
    nom: etablissement?.nom || '',
    logo: null,
    numeroRue: etablissement?.numeroRue || '',
    nomRue: etablissement?.nomRue || '',
    codePostal: etablissement?.codePostal || '',
    ville: etablissement?.ville || '',
    telephone: etablissement?.telephone || ''
  })
  const [isEditing, setIsEditing] = useState(!etablissement)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      const form = new FormData()
      form.append('nom', formData.nom)
      form.append('numeroRue', formData.numeroRue)
      form.append('nomRue', formData.nomRue)
      form.append('codePostal', formData.codePostal)
      form.append('ville', formData.ville)
      form.append('telephone', formData.telephone)
      
      if (formData.logo) {
        form.append('logo', formData.logo)
      }

      const response = await api.post('/etablissements', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      setIsEditing(false)
      onSave({
        id: response.data.id,
        nom: formData.nom,
        ville: formData.ville,
        telephone: formData.telephone,
        numeroRue: formData.numeroRue,
        nomRue: formData.nomRue,
        codePostal: formData.codePostal,
        logoUrl: response.data.logoUrl
      })
    } catch (error) {
      console.error('Erreur lors de la sauvegarde', error)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleDelete = () => {
    setFormData({
      nom: '',
      logo: null,
      numeroRue: '',
      nomRue: '',
      codePostal: '',
      ville: '',
      telephone: ''
    })
  }

  const formatPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/)
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`
    }
    return value
  }

  return (
    <>
      <div className="space-y-4 max-w-2xl mx-auto border-2 border-red-500 rounded-lg p-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="nom">Nom de l'établissement</Label>
          <Input
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="logo">Logo</Label>
          <Input
            id="logo"
            name="logo"
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                setFormData(prev => ({ 
                  ...prev, 
                  logo: e.target.files?.[0] as File
                }))
              }
            }}
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="space-y-2">
          <Label htmlFor="numeroRue">Numéro de rue</Label>
          <Input
            id="numeroRue"
            name="numeroRue"
            value={formData.numeroRue}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2 col-span-2">
          <Label htmlFor="nomRue">Nom de la rue</Label>
          <Input
            id="nomRue"
            name="nomRue"
            value={formData.nomRue}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="codePostal">Code postal</Label>
          <Input
            id="codePostal"
            name="codePostal"
            value={formData.codePostal}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ville">Ville</Label>
          <Input
            id="ville"
            name="ville"
            value={formData.ville}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="telephone">Téléphone</Label>
        <Input
          id="telephone"
          name="telephone"
          value={formatPhoneNumber(formData.telephone)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const formatted = formatPhoneNumber(e.target.value)
            setFormData(prev => ({ ...prev, telephone: formatted }))
          }}
          disabled={!isEditing}
        />
      </div>

      <div className="flex justify-end space-x-3">
        {isEditing ? (
          <Button 
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors"
          >
            Enregistrer
          </Button>
        ) : (
          <Button 
            onClick={handleEdit}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors"
          >
            {etablissement ? 'Modifier' : 'Créer un établissement'}
          </Button>
        )}
        <Button 
          variant="destructive" 
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors"
        >
          Supprimer
        </Button>
      </div>
      </div>
    </>
  )
}
