import { createClient } from '@supabase/supabase-js'
//import { useAuthUser } from 'src/store/useAuthUser'
//import { useAuthUserxx } from 'boot/pinia'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_KEY 
const supabase = createClient(supabaseUrl, supabaseAnonKey)

supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    console.log(`SESSION DO SUPABASE: ${JSON.stringify(session.access_token)}`) }
})

export default function useSupabase () {
  return { supabase }
}
