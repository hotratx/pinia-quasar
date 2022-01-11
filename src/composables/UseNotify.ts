import { useQuasar } from 'quasar'


export default function useNotify() {
  const $q = useQuasar()

  const notifySuccess = (message?: string) => {
    $q.notify({
      type: 'positive',
      message: message || 'Tudo Certo !'
    })
  }

  const notifyError = (message: string) => {
    $q.notify({
      type: 'negative',
      message: message || 'Falhou !'
    })
  }


  return {
    notifySuccess,
    notifyError
  }
}
