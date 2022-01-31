<template>
 <q-page padding>
  <p>
    Olá {{ store.user.user_metadata }}
  </p>
 </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from 'src/store/useAuthUser'

export default defineComponent({
  name: 'PageMe',
  setup() {
    const store = useAuth()
    return {
      store
    }
  }
})
</script>
