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
          :label="isUpdate ? 'Update' : 'Save' "
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
import { Pacientes } from 'src/types/global'
import { useRouter, useRoute } from 'vue-router'
import { useApi } from 'src/store/userApi'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageFormPacientes',
  setup() {

    const route = useRoute()
    const router = useRouter()
    const api = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const isUpdate = computed(() => route.params.id)

    const table = 'pacientes' 
    const form = ref<Pacientes>({
      name: '',
      id: null
    })

    onMounted(() => {
      if (isUpdate.value) {
        if (typeof isUpdate.value == 'string') {
          void handleGetPaciente(isUpdate.value)
        }
      }
    })

    const handleSubmit = async () => {
      try {
        if (isUpdate.value) {
          await api.update(table, form.value)
          notifySuccess('Update do paciente!')
        } else {
          await api.post(table, form.value)
          notifySuccess('Paciente adicionado!')
        }
        await router.push({ name: 'pacientes' })
      } catch(error) {
        if ( typeof error === 'string' ) {
          notifyError(error)
        }
      }
    }

    const handleGetPaciente = async (id: string) => {
      try {
        form.value = await api.getById(table, id)
      } catch(error) {
        if ( typeof error === 'string' ) {
          console.log(`algum erro no handleGetPaciente: ${error}`)
          notifyError(error)
        }
      }
    }

    return {
      form,
      handleSubmit,
      isUpdate
    }
  },
})
</script>

