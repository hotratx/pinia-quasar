import { defineStore } from 'pinia';
import useSupabase from 'boot/supabase'
import { Credentials } from '../types/global'
import { Provider } from '@supabase/gotrue-js/dist/main/lib/types'
import { abort } from 'process';


const { supabase } = useSupabase()



interface typeUser {
  id: string
  role: string
  email: string
  profile?: { [key:  string]: string }
}

type AccountInfo = null | typeUser | string

interface State {
  user: AccountInfo
  isLogging: boolean
}


export const useStore = defineStore('authUser', {
  state: (): State => ({
    user: 'asdf',
    isLogging: false
  }),
  getters: {
    getAccount(): AccountInfo {
      return this.user
    }
  },
  actions: {
    updateUser (data: typeUser) {
      this.user = data
    },
    async handleLogin(credentials: Credentials) {
      try {
        const { error, user } = await supabase.auth.signIn({
          email: credentials.email,
          password: credentials.password,
        })
        if (error) {
          alert('Error logging in: ' + error.message)
        }
        // No error throw, but no user detected so send magic link
        if (!error && !user) {
          alert('Check your email for the login link!')
        }
        console.log('store mostra resposa user:', user)
        console.log('user_metadata:', typeof(user?.user_metadata))
        if (user) {
          if (user.email && user.role && user.id && user.user_metadata) {
            
            const { email, id, role, user_metadata } = user
            const dados: typeUser = {
              email,
              id,
              role,
              profile: user_metadata
             }
            this.updateUser(dados)
          }
        }
      } catch (error) {
        console.error('Error thrown:', error)
        alert(error)
      }
    },
    async handleSignup(credentials: Credentials) {
      try {
        const { email, password, username } = credentials
        // prompt user if they have not filled populated their credentials
        if (!email || !password) {
          throw new Error('error no email or password')
        }
        const { error } = await supabase.auth.signUp(
          { email, password },
          {
            data: {
              firs_name: username,
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
    },
    async handleLogout() {
      try {
        const { error } = await supabase.auth.signOut()
        if (error) {
          console.error('Error', error)
          throw new Error('error no catch')
        }
      } catch (err) {
        console.error('Error')
        throw new Error('error no catch')
      }
    },
    async handleUpdateUser(credentials: Credentials) {
      try {
        const { error } = await supabase.auth.update(credentials)
        if (error) {
          alert('Error updating user info: ' + error.message)
        } else {
          alert('Successfully updated user info!')
          window.location.href = '/'
        }
      } catch (error) {
        alert('Error updating user info: ')
      }
    },
    async handlePasswordReset() {
      const email = prompt('Please enter your email:')
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
    },
    async handleOAuthLogin(provider: Provider) {
      const { error } = await supabase.auth.signIn({ provider })
      if (error) console.error('Error: ', error.message)
    }
  }
});
