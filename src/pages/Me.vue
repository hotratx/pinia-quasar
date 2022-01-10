<template>
 <q-page padding>
  <p>
    Olá {{ store.user.profile }}
  </p>
 </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '../store/useAuthUser'

export default defineComponent({
  name: 'PageMe',
  setup() {
    const store = useStore()
    return {
      store
    }
  }
})
</script>
