export interface Database {
  public: {
    Tables: {
      User: {
        Row: {
          id: string
          email: string
          firstName: string
          lastName: string
          createdAt: Date
          updatedAt: Date
        }
      }
      Etablissement: {
        Row: {
          id: string
          nom: string
          logo: Buffer | null
          numeroRue: string
          nomRue: string
          codePostal: string
          ville: string
          telephone: string
          createdAt: Date
          updatedAt: Date
        }
      }
    }
  }
}
