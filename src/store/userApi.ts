import { defineStore } from 'pinia';
import useSupabase from 'boot/supabase'
import { useStore } from 'src/store/useAuthUser'
//import { Credentials } from '../types/global'


const { supabase } = useSupabase()

interface State {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pacientes: any[] | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dados: any[] | null
}

export const useApi = defineStore('useApi', {
  state: (): State => ({
    pacientes: null,
    dados: null
  }),
  actions: {
    async listaPacientes(table: string) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
      if (error) {
        console.log('tem algum erro na busca listaPacientes')
        throw error.message
      }
      this.pacientes = data
      return data 
    },

    async getById(table: string, id: string) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('id', id)
      if (error) {
        console.log('tem algum erro na busca getById')
        throw error.message
      }
      if (data) {
        this.dados = data
      }
      throw 'Não retornou nenhum dado do getById'
    },

    async post(table: string, form: []) {
      const store = useStore()
      if (store.user) {
        const { data, error } = await supabase
          .from(table)
          .insert([
            {
              ...form,
              user_id: store.user.id
            }
          ])
        if (error) {
          console.log('tem algum erro na busca getById')
          throw error.message
        }
        console.log('post sucesso!')
      }
    }
  }
})
