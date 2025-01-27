import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server' 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const page = path === '/auth/login'
    const tokenValue = request.cookies.get('token')

    if (tokenValue && page) {
        return NextResponse.redirect(new URL('/', request.url))
    }
}
    export const config = {
        matcher: [
        '/auth/login',
     ]
    }
