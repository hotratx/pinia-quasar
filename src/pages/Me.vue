<template>
 <q-page padding>
  <p>
    Olá {{ userSession.user_metadata.name }}
  </p>
 </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthUser } from '../composables/UserAuthUser'

export default defineComponent({
  name: 'PageMe',
  setup() {
    const { userSession } = useAuthUser()
    return {
      userSession
    }
  }
})
</script>
