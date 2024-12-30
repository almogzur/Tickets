import { NextRequest, NextResponse } from 'next/server'

import cookie from 'cookie';


export function middleware(req: Request) {
    const nonce = crypto.randomUUID(); // Generate a secure nonce
    const response = NextResponse.next();


    // Store nonce in a cookie
    response.cookies.set('nonce', nonce, { httpOnly: true, secure: true, sameSite: 'strict' });

    return response;
}