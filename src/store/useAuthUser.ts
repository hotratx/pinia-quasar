import { defineStore } from 'pinia';
import useSupabase from 'boot/supabase'
import { Credentials } from '../types/global'
import { Provider, User } from '@supabase/gotrue-js/dist/main/lib/types'

type IUser = null | User

interface State {
  isLogging: boolean
  user: IUser
}

const { supabase } = useSupabase()


export const useAuth = defineStore('authUser', {
  state: (): State => ({
    user: null,
    isLogging: false
  }),

  getters: {
    getAccount(): null | User {
      if (this.user) {
        return this.user
      }
      return null
    }
  },
  actions: {
    updateUser (data: User) {
      this.user = data
      this.isLogging = true
      //localStorage.setItem('cart', JSON.stringify(this.user))
    },
    logoutUser () {
      this.user = null
      this.isLogging = false
    },

    async handleLogin(credentials: Credentials) {//{{{
      const { error , user } = await supabase.auth.signIn({
        email: credentials.email,
        password: credentials.password,
      })
      if (error) {
        console.log('temmm errrorr')
        throw error.message
      }
      if (!error && !user) {
        throw 'error ao tentar logar'
      }
      if (user?.email && user?.role && user?.id && user?.user_metadata) {
        this.updateUser(user)
      }
    },//}}}

    async handleSignup(credentials: Credentials) {//{{{
      try {
        const { email, password, username } = credentials
        if (!email || !password) {
          throw new Error('error no email or password')
        }
        const { error } = await supabase.auth.signUp(
          { email, password },
          {
            data: {
              first_name: username,
              age: 27
            }
          })
        if (error) {
          console.error(error, error.message)
          throw new Error('error no error')
        }
      } catch (error) {
        console.error('signup error', error)
        throw new Error('error no catch')
      }
    },//}}}

    async handleLogout() {//{{{
      try {
        const { error } = await supabase.auth.signOut()
        if (error) {
          console.error('Error', error)
          throw new Error('error no catch')
        }
        this.logoutUser()
      } catch (err) {
        console.error('Error')
        throw new Error('error no catch')
      }
    },//}}}

    async handleUpdateUser(credentials: Credentials) {//{{{
      try {
        const { error, user } = await supabase.auth.update(credentials)
        if (error) {
          alert('Error updating user info: ' + error.message)
        } 
        if (user) {
          alert('Successfully updated user info!')
          this.updateUser(user)
        }
      } catch (error) {
        alert('Error updating user info: ')
      }
    },//}}}

    async handlePasswordResetEmail(email: string) {//{{{
      if (!email) {
        window.alert('Email address is required.')
      } else {
        const { error } = await supabase.auth.api.resetPasswordForEmail(email)
        if (error) {
          alert('Error: ' + error.message)
        } else {
          alert('Password recovery email has been sent.')
        }
      }
    },//}}}

    async resetPassword(jwt: string, password: string) {//{{{
      const { user, error } = await supabase.auth.api.updateUser(
        jwt,
        { password: password }
      )
      if (error) {
        console.log('error reset password')
        throw error
      } else {
        console.log('success reset password')
        return user
      }
    },//}}}

    async handleOAuthLogin(provider: Provider) {//{{{
      const { error } = await supabase.auth.signIn({ provider })
      if (error) console.error('Error: ', error.message)
    }//}}}
  }
});
