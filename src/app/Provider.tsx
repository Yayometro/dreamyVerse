"use client"
import {SessionProvider} from 'next-auth/react'

interface ISession {
    user: {
      /** The user's postal address. */
      address: string
    }
  }

// export const AuthProvider = ({children , session}: {children:React.ReactNode, session: Session | null}
const AuthProvider = ({children}: {children:React.ReactNode}
  ) => {
    return <SessionProvider>
        {children}
    </SessionProvider>
}

export default AuthProvider