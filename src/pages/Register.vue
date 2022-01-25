<template>
 <q-page padding>
   <q-form class="row justify-center" @submit.prevent="handleRegister">
      <p class="col-12 text-h5 text-center">
        Register
      </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
        <q-input 
          label="Name"
          v-model="form.username" 
        />
        <q-input 
          label="Email"
          v-model="form.email" 
        />

        <q-input 
          label="Password"
          v-model="form.password" 
        />

        <div class="full-width q-gutter-y-sm">
          <q-btn
            label="Register"
            color="primary"
            class="full-width"
            type="submit"
          />
          <q-btn
            label="Back"
            color="primary"
            class="full-width"
            type="submit"
            flat
            :to="{ name: 'login' }"
          />
        </div>
      </div>
   </q-form>
   {{ form.email }}
 </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Credentials } from '../types/global'
import { useRouter } from 'vue-router'
import { useStore } from '../store/useAuthUser'

export default defineComponent({
  name: 'PageRegister',

  setup() {
    const router = useRouter()
    const store = useStore()

    const form = ref<Credentials>({
      email: '',
      password: '',
      username: ''
    })

    const handleRegister = async () => {
      try {
        await store.handleSignup(form.value)
        await router.push({
          name: 'email-confirmation',
          query: { email: form.value.email }
        })
      } catch (error) {
        console.log('error no Login', error)
      }
    }

    return {
      form,
      handleRegister
    }
  }
})
</script>
