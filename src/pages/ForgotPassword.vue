<template>
 <q-page padding>
   <q-form class="row justify-center" @submit.prevent="handleForgotPassword">
      <p class="col-12 text-h5 text-center">
        Register
      </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
        <q-input 
          label="Email"
          v-model="form.email" 
        />
        <div class="full-width q-gutter-y-sm">
         <q-btn
          label="Send Reset Email"
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
import { defineComponent, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../store/useAuthUser'

export default defineComponent({
  name: 'PagePasswordReset',

  setup() {
    const router = useRouter()
    const store = useAuth()

    const form = ref({
      email: '',
    })

    const handleForgotPassword = async () => {
      try {
        await store.handlePasswordResetEmail(form.value.email)
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
      handleForgotPassword
    }
  }
})
</script>
