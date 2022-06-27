import React, { useEffect, useState, createContext, useContext } from 'react'
import { useRouter } from 'next/router'
import { supabase } from './supabase'
import { Session, User } from '@supabase/supabase-js'

export const SignOut = async () => {
  await supabase.auth.signOut()
}

export const RequireAuth = () => {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/auth')
    }
  }, [user, router])
}

export const AuthRedirect = () => {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])
}

type UserContextValue = {
  session: Session | undefined | null
  user: User | undefined | null | false
}

export const UserContext = createContext<UserContextValue | undefined>(
  undefined
)

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [session, setSession] = useState<Session | undefined | null>()
  const [user, setUser] = useState<User | undefined | null | false>()

  useEffect(() => {
    const session = supabase.auth.session()
    setSession(session)
    setUser(session?.user ?? false)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? false)
      }
    )

    return () => {
      authListener && authListener.unsubscribe()
    }
  }, [])

  const value = {
    session,
    user,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`)
  }
  return context
}

const AuthUser = () => {
  const { user } = useUser()
  return user
}

export default AuthUser
