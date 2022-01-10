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
        />
        <q-input 
          label="Password"
          v-model="form.password" 
        />

        <div class="full-width q-pt-md">
         <q-btn
          label="login"
          color="primary"
          class="full-width"
          type="submit"
        />
        </div>
        <div class="full-width">
         <q-btn
          label="Register"
          color="primary"
          class="full-width"
          type="submit"
          to="{ name: register }"
        />
        </div>

      </div>
   </q-form>
   {{ form.email }}
 </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { Credentials } from '../types/global'
import { useRouter } from 'vue-router'
import { useStore } from '../store/useAuthUser'

export default defineComponent({
  name: 'PageIndex',

  setup() {
    const router = useRouter()
    const store = useStore()

    const form = ref<Credentials>({
      email: '',
      password: '',
    })

    const Login = async () => {
      try {
        await store.handleLogin(form.value)
          .then(() => console.log('SUCESSSO', store.getAccount))
        
        await router.push({
          name: 'me'
        })
      } catch (error) {
        console.log('error no Login', error)
      }

    }

    return {
      form,
      Login
    }
  }
})
</script>
