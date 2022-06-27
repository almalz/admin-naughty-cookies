import { supabase } from '../../lib/supabase'
import { Auth, Button, Typography } from '@supabase/ui'
import { SignOut, useUser } from '../../lib/auth'

export function AuthForm() {
  const { user } = useUser()

  return (
    <>
      {user ? (
        <>
          <Typography.Text>Signed in: {user.email}</Typography.Text>
          <Button block onClick={() => SignOut()}>
            Sign out
          </Button>
        </>
      ) : (
        <Auth.UserContextProvider supabaseClient={supabase}>
          <Auth
            supabaseClient={supabase}
            providers={['google']}
            onlyThirdPartyProviders
          />
        </Auth.UserContextProvider>
      )}
    </>
  )
}
