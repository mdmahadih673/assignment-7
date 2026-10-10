import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
    const response = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
        headers: {
            cookie: request.headers.get("cookie") || "",
        },
    });
    
    const session = await response.json().catch(() => null);

    if (!session) {
        return NextResponse.redirect(new URL('/sign-up', request.url))
    }
    
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/profile/:path*',
        '/newsDetails/:path*',
        '/products/:path*'
    ],
}