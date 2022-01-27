<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">
          Form Pacientes
        </p>
      </div>
      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">
        <q-input
          label="Name"
          v-model="form.name"
          :rules="[val => (val && val.length > 3) || 'Nome é obrigatorio']"
        />
        <q-btn 
          label="Save"
          color="primary"
          class="full-width"
          type="submit"
        ></q-btn>

        <q-btn 
          label="Cancel"
          color=""
          class="full-width"
          flat
          :to="{ name: 'pacientes' }"
        ></q-btn>
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { PacientForm } from 'src/types/global'
import { useRouter, useRoute } from 'vue-router'
import { useApi } from 'src/store/userApi'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageFormPacientes',
  setup() {

    const { notifyError, notifySuccess } = useNotify()
    const route = useRoute()
    const router = useRouter()
    const api = useApi()

    const table = 'pacientes' 

    const isUpdate = computed(() => route.params.id)

    const form = ref<PacientForm>({
      name: ''
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type Paciente = any[] | null
    const paciente = ref<Paciente>([])

    onMounted(() => {
      if (isUpdate.value) {
        if (typeof isUpdate.value == 'string') {
          void handleGetPaciente(isUpdate.value)
        }
      }
    })

    const handleSubmit = async () => {
      try {
        await api.post(table, form.value)
        notifySuccess('Adicionar paciente com sucesso!')
        await router.push({ name: 'pacientes' })
      } catch(error) {
        if ( typeof error === 'string' ) {
          notifyError(error)
        }
      }
    }

    const handleGetPaciente = async (id: string) => {
      try {
        paciente.value = await api.getById(table, id)
        console.log(`paciente.value: ${JSON.stringify(paciente.value)}`)
        if (paciente.value) {
          console.log(`paciente.value: ${JSON.stringify(paciente.value[0])}`)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          form.value = paciente.value[0]
        }
      } catch(error) {
        if ( typeof error === 'string' ) {
          console.log(`algum erro no handleGetPaciente: ${error}`)
          notifyError(error)
        }
      }
    }

    return {
      form,
      handleSubmit
    }
  },
})
</script>

