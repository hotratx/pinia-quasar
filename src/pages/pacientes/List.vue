<template>
 <q-page padding>
    <div class="q-pa-md">
      <q-table
        :rows="pacientes"
        :columns="columns"
        row-key="name"
        classs="col-md-4 col-sm-6 col-xs-10"
      >
        <template v-slot:top>
          <span class="text-h6">
            Pacientes
          </span>
          <q-space/>
          <q-btn label="Add New" color='primary'></q-btn>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon='mdi-pencil-outline' color='info' dense size='sm'>
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


const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
  },
]

import { defineComponent, ref, onMounted } from 'vue'
import useNotify from 'src/composables/UseNotify'
import { useApi } from 'src/store/userApi'

export default defineComponent({
  name: 'PageListClientes',
  setup() {
    const api = useApi()
    const { notifyError } = useNotify()


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type Paciente = any[] | null
    
    const pacientes = ref<Paciente>([])

    const handleListPacientes = async () => {
      try {
        pacientes.value = await api.listaPacientes('pacientes')
        console.log('resposta da lista de pacientes: ', pacientes.value)
      } catch(error) {
        if (typeof error == 'string') {
          notifyError(error)
        }
      }
    }

    onMounted(() => {
      void handleListPacientes()
    })

    return {
      columns,
      pacientes
    }
  }
})
</script>
