import { boot } from 'quasar/wrappers';
import { createPinia, defineStore } from 'pinia';

console.log('Iniciando Pinia')


type User = null | string
interface State {
  userxx: User
}

export const useAuthUserxx = defineStore('main', {
  state: (): State => ({
    userxx: null
  })
})


const pinia = createPinia()
export default boot(({ app }) => {
  app.use(pinia);
})
