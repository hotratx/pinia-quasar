import { boot } from 'quasar/wrappers';
import { createPinia } from 'pinia';

console.log('Iniciando Pinia')
export default boot(({ app }) => {
  app.use(createPinia());
})
