import { defineStore } from 'pinia';
import useSupabase from 'boot/supabase'
import { useAuth } from 'src/store/useAuthUser'
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
      const auth = useAuth()
      console.log(`form.name: ${JSON.stringify(form)}`)
      if (auth.user) {
        const { data, error } = await supabase
          .from(table)
          .insert([
            {
              name: form.name,
              user_id: auth.user.id
            }
          ])
        if (error?.message) {
          console.log('tem algum erro na busca getById')
          throw error.message
        }
        console.log('post sucesso!')
      }
    },

    async remove(table: string, id: number) {
      const { error } = await supabase
        .from(table)
        .delete()
        .match({ id: id})
      if ( error ) {
        console.log(`error no remove id: ${id}`)
        throw  error.message
      }
    },

    async update(table: string, form: Pacientes) {
      console.log('update ')
      const { data, error } = await supabase
        .from(table)
        .update({ ...form })
        .match({ id: form.id }) 
      if ( error ) {
        console.log('erro no update userApi')
        throw error.message
      }
      if ( data ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        onePaciente = data[0]
        console.log(`update feito com sucesso ${JSON.stringify(onePaciente)}`)
      }
    }
  }
})
