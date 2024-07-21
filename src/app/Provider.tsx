"use client"
import {SessionProvider} from 'next-auth/react'

interface ISession {
    user: {
      /** The user's postal address. */
      address: string
    }
  }

const AuthProvider = ({children}: {children:React.ReactNode}
  ) => {
    return <SessionProvider>
        {children}
    </SessionProvider>
}

export default AuthProvider