import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const etablissements = await prisma.etablissement.findMany({
      select: {
        id: true,
        nom: true,
        ville: true,
        telephone: true,
        numeroRue: true,
        nomRue: true,
        codePostal: true,
        logo: true
      }
    })

    // Convertir le buffer logo en URL base64
    const etablissementsWithLogoUrl = etablissements.map(e => ({
      ...e,
      logoUrl: e.logo ? `data:image/png;base64,${Buffer.from(e.logo).toString('base64')}` : undefined
    }))

    return NextResponse.json(etablissementsWithLogoUrl)
  } catch (error) {
    console.error('Erreur récupération établissements', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des établissements' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    
    await prisma.etablissement.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur suppression établissement', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    
    let logoBuffer = null
    const logoFile = formData.get('logo') as File | null
    
    if (logoFile && logoFile.size > 0) {
      logoBuffer = Buffer.from(await logoFile.arrayBuffer())
    }

    const etablissement = await prisma.etablissement.create({
      data: {
        nom: formData.get('nom') as string,
        numeroRue: formData.get('numeroRue') as string,
        nomRue: formData.get('nomRue') as string,
        codePostal: formData.get('codePostal') as string,
        ville: formData.get('ville') as string,
        telephone: formData.get('telephone') as string,
        logo: logoBuffer
      }
    })

    return NextResponse.json(etablissement, { status: 201 })
  } catch (error) {
    console.error('Erreur création établissement', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création' },
      { status: 500 }
    )
  }
}
