<template>
  <q-layout view="hHh Lpr lff"  class="shadow-2 rounded-borders">
    <q-header elevated class="bg-black">
      <q-toolbar>
      <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>
          <q-btn-dropdown fab-mini flat color="white" icon="person">
            <q-list>
              <q-item clickable v-close-popup >
                <q-item-section>
                  <q-item-label @click="Logout">Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above

      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"

      
      :width="270"
      :breakpoint="500"
      bordered
      class="bg-grey-3"
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store/useAuthUser'
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'


const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];


export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {

    const $q = useQuasar()
    const router = useRouter()
    const store = useStore()

    const leftDrawerOpen = ref(false)
    const drawer = ref(false)
    const miniState = ref(true)

    const deslogar: () => void = async () => {
      try {
        await store.handleLogout()
        await router.push({
          name: 'login'
        })
      } catch (error) {
        console.log('Error no logout')
        return
      }
    }

    const Logout = () => {
      $q.dialog({
        title: 'Logout',
        message: 'Você quer deslogar?',
        cancel: true,
        persistent: true
      }).onOk(deslogar)
     }


    return {
      drawer,
      miniState,
      Logout,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
