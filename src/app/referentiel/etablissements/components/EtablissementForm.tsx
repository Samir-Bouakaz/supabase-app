'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface EtablissementFormProps {
  initialData?: {
    id?: string
    nom: string
    logo?: string
    numero?: number
    rue: string
    codePostal: string
    ville: string
    telephone: string
  }
  onSave: (data: any) => void
  onDelete?: () => void
}

export function EtablissementForm({ initialData, onSave, onDelete }: EtablissementFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    onSave(Object.fromEntries(formData))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="nom">Nom de l'établissement</Label>
        <Input
          id="nom"
          name="nom"
          defaultValue={initialData?.nom}
          required
        />
      </div>

      <div>
        <Label htmlFor="logo">Logo</Label>
        <Input
          id="logo"
          name="logo"
          type="file"
          accept="image/*"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="numero">Numéro de rue</Label>
          <Input
            id="numero"
            name="numero"
            type="number"
            defaultValue={initialData?.numero}
            required
          />
        </div>

        <div>
          <Label htmlFor="rue">Nom de la rue</Label>
          <Input
            id="rue"
            name="rue"
            defaultValue={initialData?.rue}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="codePostal">Code postal</Label>
          <Input
            id="codePostal"
            name="codePostal"
            defaultValue={initialData?.codePostal}
            required
          />
        </div>

        <div>
          <Label htmlFor="ville">Ville</Label>
          <Input
            id="ville"
            name="ville"
            defaultValue={initialData?.ville}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="telephone">Téléphone</Label>
        <Input
          id="telephone"
          name="telephone"
          defaultValue={initialData?.telephone}
          pattern="[0-9]{10}"
          title="Format : 10 chiffres sans espaces"
          required
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="bg-green-500 hover:bg-green-600">
          {initialData?.id ? 'Modifier' : 'Enregistrer'}
        </Button>
        {initialData?.id && (
          <Button
            type="button"
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600"
          >
            Supprimer
          </Button>
        )}
      </div>
    </form>
  )
}
