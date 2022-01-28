<template>
 <q-page padding>
    <div class="q-pa-md">
      <q-table
        :rows="allPacientes"
        :columns="columns"
        row-key="name"
        classs="col-md-4 col-sm-6 col-xs-10"
        :loading="loading"
      >
        <template v-slot:top>
          <span class="text-h6">
            Pacientes
          </span>
          <q-space/>
          <q-btn 
            label="Add New" 
            color='primary' 
            icon="mdi-plus" 
            dense
            :to="{ name: 'form-pacientes' }"
          />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon='mdi-pencil-outline' color='info' dense size='sm' @click="handleEdit(props.row)">
              <q-tooltip>Edit</q-tooltip>
            </q-btn>
            <q-btn icon='mdi-delete-outline' color='negative' dense size='sm'>
              <q-tooltip>Remove</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
 </q-page>
</template>

<script lang="ts">

interface rowTable {
  name: string
  calories: string
  fat: string
} 

const columns = [
    {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: (row: rowTable): string => row.name,
    format: (val: string): string => `${val}`,
    sortable: true
  },
  { name: 'id', align: 'left', label: 'Id', field: 'id', sortable: true },
  { name: 'created_at', align: 'left', label: 'Criado em', field: 'created_at', sortable: true },
  { name: 'actions', align: 'center', label: 'Actions', field: 'fat', sortable: true },
]

import { defineComponent, ref, onMounted, computed } from 'vue'
import useNotify from 'src/composables/UseNotify'
import { useApi } from 'src/store/userApi'
import { useRouter } from 'vue-router'
import { Pacientes } from 'src/types/global'

export default defineComponent({
  name: 'PageListClientes',
  setup() {

    const router = useRouter()
    const api = useApi()
    const { notifyError } = useNotify()

    const loading = ref(true)


    const allPacientes = ref<Pacientes[]>([])


    const handleListPacientes = async () => {
      try {
        allPacientes.value = await api.listaPacientes('pacientes')
        loading.value = false
        console.log('resposta da lista de pacientes: ', allPacientes.value)
      } catch(error) {
        if (typeof error == 'string') {
          notifyError(error)
        }
      }
    }

    interface PacienteRow {
      id: number
      name: string
    }
    const handleEdit = (paciente: PacienteRow) => {
      console.log('resultado da row: ', paciente.id)
      void router.push({ name: 'form-pacientes', params: { id: paciente.id } })
    }

    onMounted(() => {
      void handleListPacientes()
    })

    return {
      columns,
      allPacientes,
      loading,
      handleEdit
    }
  }
})
</script>
