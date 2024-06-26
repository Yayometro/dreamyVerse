// export {default} from 'next-auth/middleware'
import { withAuth } from 'next-auth/middleware'

// import { NextResponse } from 'next/server'
 
// export function middleware(request) {
//   if (request.nextUrl.pathname.startsWith('/dashboard')) {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }
// }
export default withAuth({
    pages: {
      signIn: '/login',
      error: '/login', // Error page if an error occurs during authentication
    }
  });
  
  export const config = { matcher: ['/dashboard/:path*'] };
