import { ref } from 'vue'
import useSupabase from 'boot/supabase'
import { Session, Provider } from '@supabase/gotrue-js/dist/main/lib/types'
import { Credentials } from '../types/global'
import { abort } from 'process'


const { supabase } = useSupabase()
const userSession = ref<Session | null>(null)

/*
 * Handles user login via email + password into a supabase session.
 * If not password is empty, it will send a magic link to the users email address.
 */
function useAuthUser() {
  async function handleLogin(credentials: Credentials) {
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
    } catch (error) {
      console.error('Error thrown:', error)
      alert(error)
    }
  }

  /*
   * Handles signup provided a valid credentials object.
   */
  async function handleSignup(credentials: Credentials) {
    try {
      const { email, password } = credentials
      // prompt user if they have not filled populated their credentials
      if (!email || !password) {
        throw new Error('error no email or password')
      }
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        console.error(error, error.message)
        throw new Error('error no error')
      }
    } catch (error) {
      console.error('signup error', error)
      throw new Error('error no catch')
    }
  }

  /**
   * Handles signup via Third Party Login.
   * https://supabase.com/docs/guides/auth#third-party-logins
   */
  async function handleOAuthLogin(provider: Provider) {
    const { error } = await supabase.auth.signIn({ provider })
    if (error) console.error('Error: ', error.message)
  }

  /**
   * Handles password reset. Will send an email to the given email address.
   */
  async function handlePasswordReset() {
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
  }

  async function handleUpdateUser(credentials: Credentials) {
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
  }

  /**
   * Handles logging a user out of a supabase session
   */
  async function handleLogout() {
    console.log('logging out')
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        alert('Error signing out')
        console.error('Error', error)
        return
      }

      alert('You have signed out!')
    } catch (err) {
      alert('Unknown error signing out')
      console.error('Error')
    }
  }
  return {
    userSession,
    handleLogin,
    handleOAuthLogin,
    handleSignup,
    handleLogout,
    handlePasswordReset,
    handleUpdateUser,
  }
}

export {
  useAuthUser
}
