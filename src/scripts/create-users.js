import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase configuration in .env file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function updateUser(email, firstName, lastName) {
  // Récupérer l'utilisateur par email via l'API auth
  const { data: { users }, error: fetchError } = await supabase.auth.admin.listUsers()
  
  if (fetchError) {
    console.error('Error fetching users:', fetchError.message)
    return null
  }

  const user = users.find(u => u.email === email)
  if (!user) {
    console.error('User not found:', email)
    return null
  }

  // Mettre à jour les metadata
  const { data, error } = await supabase.auth.admin.updateUserById(
    user.id,
    {
      user_metadata: {
        full_name: `${firstName} ${lastName}`,
        first_name: firstName,
        last_name: lastName
      }
    }
  )

  if (error) {
    console.error('Error updating user:', error.message)
    return null
  }

  console.log('User updated successfully:', data.user.email)
  return data.user
}

// Liste des utilisateurs à créer
const usersToCreate = [
  { 
    email: 'osullivans.securite@gmail.com', 
    password: 'BOUASAM-3399-OSULL-K7NP4WX',
    firstName: 'Samir',
    lastName: 'Bouakaz'
  },
  { 
    email: 'astieredouard19@yahoo.fr', 
    password: 'ASTEDO-6717-ASTIE-R2M5YH9',
    firstName: 'Edouard',
    lastName: 'Astier'
  },
  { 
    email: 'francois.renaud@hotmail.com', 
    password: 'RENFRA-3690-FRANC-L6V8XT3',
    firstName: 'François',
    lastName: 'Renaud'
  },
  { 
    email: 'silincioabel@yahoo.fr', 
    password: 'ESSABE-9125-SILIN-T8L3VQ4',
    firstName: 'Abel',
    lastName: 'Essiben'
  },
  { 
    email: 'ben.ramses@osullivans-pubs.com', 
    password: 'NOMABEN-9855-BENRA-W6X9ZJ5',
    firstName: 'Benjamin',
    lastName: 'Noma'
  },
  { 
    email: 'benkhalifa.laroussi1@gmail.com', 
    password: 'BENLAR-3695-BENKA-H4D8UF2',
    firstName: 'Benkhalifa',
    lastName: 'Laroussi'
  },
  { 
    email: 'benoitcoppolani@gmail.com', 
    password: 'COPPBEN-8236-BENOI-N1G7PA6',
    firstName: 'Benoit',
    lastName: 'Coppolani'
  },
  { 
    email: 'khoubaieb2016@gmail.com', 
    password: 'ZBIKHO-6328-KHOUB-B5C2ME8',
    firstName: 'Khoubaïeb',
    lastName: 'Zbiri'
  },
  { 
    email: 'valeryfoidjingtagne@gmail.com', 
    password: 'FOIVAL-0510-VALER-Y9S4QK7',
    firstName: 'Valérie',
    lastName: 'Foidjing Tagné'
  },
  { 
    email: 'firhounkhalid@gmail.com', 
    password: 'FIRKHA-0510-FIRHO-Y9S4QK7',
    firstName: 'Firhoun',
    lastName: 'Khalid'
  },
  { 
    email: 'benbitan75@gmail.com', 
    password: 'BITBEN-0510-BENJA-Y9S4QK7',
    firstName: 'Benjamin',
    lastName: 'Bitan'
  },
  { 
    email: 'celine.lopes@osullivans-pubs.com', 
    password: 'LOPCEL-4752-CELI-M8P9YW2',
    firstName: 'Céline',
    lastName: 'Lopes'
  }
]

async function main() {
  for (const user of usersToCreate) {
    await updateUser(user.email, user.firstName, user.lastName)
  }
}

main()
