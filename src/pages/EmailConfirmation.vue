<template>
 <q-page padding>
  <p>
    Obrigado pelo Registro
  </p>
  <p>
    Por favor confirme o email para terminar o registro {{ $route.query.email }}
  </p>
 </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageEmailConfirmation',


})
</script>
