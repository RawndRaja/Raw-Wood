import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server' 
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const page = path === '/auth/login' 
    const logout = path === '/auth/logout'
    const tokenValue = request.cookies.get('token')

    if (tokenValue && page) {
        return NextResponse.redirect(new URL('/auth/logout', request.url))
    }
    if (!tokenValue && logout) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
}
    export const config = {
        matcher: [
        '/auth/login',
        '/auth/logout',
     ]
    }
