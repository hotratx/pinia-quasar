import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oniptihbpipbeukgrwwj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTMxNDMyNywiZXhwIjoxOTU2ODkwMzI3fQ.XDxsKeOJjHznD1_tsigwJ3L_rZUDESujZ1C8ZtIHv_Q'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

console.log('Init supabase', supabase);

export default function useSupabase () {
  return { supabase }
}
