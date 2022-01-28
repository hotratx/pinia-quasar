import { defineStore } from 'pinia';
import useSupabase from 'boot/supabase'
import { useStore } from 'src/store/useAuthUser'
import { Pacientes } from '../types/global'


const { supabase } = useSupabase()

interface State {
  pacientes: Pacientes[]
}

let allPacientes: Pacientes[] = []
let onePaciente: Pacientes

export const useApi = defineStore('useApi', {
  state: (): State => ({
    pacientes: [],
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
      if (data === null) {
        allPacientes = []
        throw 'Nenhum dado recebido'
      }
       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      allPacientes = data
      this.pacientes = allPacientes
      return allPacientes
    },

    async getById(table: string, id: string) {
      console.log('o id passado para o getById foi:', id)
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('id', id)
      if (error) {
        console.log('tem algum erro na busca getById')
        throw error.message
      }
      if (data) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        onePaciente = data[0]
        return onePaciente
      }
      throw 'error fetch getById'
    },

    async post(table: string, form: Pacientes) {
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
        if (error?.message) {
          console.log('tem algum erro na busca getById')
          throw error.message
        }
        console.log('post sucesso!')
      }
    }
  }
})
