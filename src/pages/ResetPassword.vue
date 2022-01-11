<template>
 <q-page padding>
   <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
      <p class="col-12 text-h5 text-center">
        Reset Passworddd
      </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm" q-gutter-y-sm>
        <q-input 
          label="New Password"
          v-model="password" 
        />

         <q-btn
          label="Send Reset Email"
          color="primary"
          class="full-width"
          type="submit"
          flat
        />
      </div>
   </q-form>
 </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '../store/useAuthUser'

export default defineComponent({
  name: 'PageResetPassword',

  setup() {
    const store = useStore()

    const router = useRouter() // usado para fazer redirecionanmento do user
    const route = useRoute() // pega a rota atual

    //let token = ref('')
    const token = route.query.token?.toString()

    //const jwt: LocationQueryValue = token

    const password = ref('')

    const handlePasswordReset = async () => {
      try {
        console.log('entrou no handlePasswordReset')
        if (typeof token == 'string') {
          console.log('tipo do token: ', typeof(token))
          console.log('valor token: ', token)
          await store.resetPassword(token, password.value)
          await router.push({
            name: 'login'
          })
        } else {
          console.log('nao funcionou')
          console.log('tipo do token: ', typeof(token))
          console.log('valor token: ', token)
        }
      } catch (error) {
        console.log('error no Login', error)
      }
    }

    return {
      password,
      handlePasswordReset
    }
  }
})
</script>
