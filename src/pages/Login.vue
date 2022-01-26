<template>
 <q-page padding>
   <q-form class="row justify-center" @submit.prevent="Login">
      <p class="col-12 text-h5 text-center">
        Login
      </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
        <q-input 
          label="Email"
          v-model="form.email" 
          lazy-rules
          :rules="[val => isEmail(val) || 'Email é requerido']"
          type="email"
        />
        <q-input 
          label="Password"
          v-model="form.password" 
        />

        <div class="full-width q-pt-md q-gutter-y-sm">
         <q-btn
          label="login"
          color="primary"
          class="full-width"
          type="submit"
        />
         <q-btn
          label="Register"
          color="primary"
          class="full-width"
          type="submit"
          flat
          :to="{ name: 'register' }"
        />
         <q-btn
          label="Forgot Password"
          color="primary"
          class="full-width"
          type="submit"
          flat
          :to="{ name: 'forgot-password' }"
        />

        </div>

      </div>
   </q-form>
   {{ form.email }}
 </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { Credentials } from '../types/global'
import { useRouter } from 'vue-router'
import { useStore } from '../store/useAuthUser'
import useNotify from 'src/composables/UseNotify'
import isEmail from 'src/composables/typeCheck'


export default defineComponent({
  name: 'PageLogin',

  setup() {
    const { notifySuccess, notifyError } = useNotify()
    
    const router = useRouter()
    const store = useStore()

    onMounted(() => {
      if (store.isLogging)
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push({
          name: 'me'
        })
    })

    const form = ref<Credentials>({
      email: '',
      password: '',
    })

    const Login = async () => {
      try {
        await store.handleLogin(form.value)
        console.log('SUCESSSO', store.getAccount)
        // ou posso usar void na frente do push
        // caso usamos then()
        notifySuccess('Voce logou com sucesso!!')
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        void router.push({
            name: 'me'
        })
    } catch (error) {
      if (typeof error === 'string') {
        notifyError(error)
        } else {
          console.log('error no Login', error)
        }
      }
    }

    return {
      form,
      Login,
      isEmail
    }
  }
})
</script>
