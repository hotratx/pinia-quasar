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
            v-if="$q.platform.is.desktop"
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
            <q-btn icon='mdi-delete-outline' color='negative' dense size='sm' @click="handleRemovePaciente(props.row)">
              <q-tooltip>Remove</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
      <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
      >
        <q-btn
          v-if="$q.platform.is.mobile"
          fab
          icon="mdi-plus"
          color="primary"
          :to="{ name: 'form-pacientes' }"
        />
    </q-page-sticky>
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

import { defineComponent, ref, onMounted, computed, watch } from 'vue'
import useNotify from 'src/composables/UseNotify'
import { useApi } from 'src/store/userApi'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { Pacientes } from 'src/types/global'

export default defineComponent({
  name: 'PageListClientes',
  setup() {

    interface PacienteRow {
      id: number
      name: string
    }

    const router = useRouter()
    const api = useApi()
    const $q = useQuasar()
    const { notifyError, notifySuccess } = useNotify()

    const table = 'pacientes'
    const loading = ref(true)
    const allPacientes = ref<Pacientes[]>([])

    watch(api.$state , (state) => {
      localStorage.setItem('piniaState', JSON.stringify(state))
    },
      {deep: true}
    )

    const handleListPacientes = async () => {
      try {
        loading.value = true
        allPacientes.value = await api.listaPacientes(table)
        loading.value = false
      } catch(error) {
        if (typeof error == 'string') {
          notifyError(error)
        }
      }
    }

    const handleEdit = (paciente: PacienteRow) => {
      void router.push({ name: 'form-pacientes', params: { id: paciente.id } })
    }

    const handleRemovePaciente = (paciente: PacienteRow) => {
      const remove: () => void = async () => {
        await api.remove(table, paciente.id)
        notifySuccess('Paciente removido')
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        handleListPacientes()
      }

      try {
        $q.dialog({
          title: 'Confirmar',
          message: `Quer remover o paciente ${paciente.name}`,
          cancel: true,
          persistent: true
        }).onOk(remove)
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
      allPacientes,
      loading,
      handleEdit,
      handleRemovePaciente
    }
  }
})
</script>
