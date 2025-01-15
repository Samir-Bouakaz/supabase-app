import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase configuration in .env file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function createUser(email, password) {
  const { data, error } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true
  })

  if (error) {
    console.error('Error creating user:', error.message)
    return null
  }

  console.log('User created successfully:', data.user.email)
  return data.user
}

// Liste des utilisateurs à créer
const usersToCreate = [
  { email: 'osullivans.securite@gmail.com', password: 'BOUASAM-3399-OSULL-K7NP4WX' },
  { email: 'astieredouard19@yahoo.fr', password: 'ASTEDO-6717-ASTIE-R2M5YH9' },
  { email: 'francois.renaud@hotmail.com', password: 'RENFRA-3690-FRANC-L6V8XT3' },
  { email: 'silincioabel@yahoo.fr', password: 'ESSABE-9125-SILIN-T8L3VQ4' },
  { email: 'ben.ramses@osullivans-pubs.com', password: 'NOMABEN-9855-BENRA-W6X9ZJ5' },
  { email: 'benkhalifa.laroussi1@gmail.com', password: 'BENLAR-3695-BENKA-H4D8UF2' },
  { email: 'benoitcoppolani@gmail.com', password: 'COPPBEN-8236-BENOI-N1G7PA6' },
  { email: 'khoubaieb2016@gmail.com', password: 'ZBIKHO-6328-KHOUB-B5C2ME8' },
  { email: 'valeryfoidjingtagne@gmail.com', password: 'FOIVAL-0510-VALER-Y9S4QK7' },
  { email: 'firhounkhalid@gmail.com', password: 'FIRKHA-0510-FIRHO-Y9S4QK7' },
  { email: 'benbitan75@gmail.com', password: 'BITBEN-0510-BENJA-Y9S4QK7' },
  { email: 'celine.lopes@osullivans-pubs.com', password: 'LOPCEL-4752-CELI-M8P9YW2' }
]

async function main() {
  for (const user of usersToCreate) {
    await createUser(user.email, user.password)
  }
}

main()
