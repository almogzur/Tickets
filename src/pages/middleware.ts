import { NextResponse } from 'next/server';

export function middleware(req: Request) {
    const nonce = crypto.randomUUID(); // Generate a secure nonce
    const res = NextResponse.next();

    res.headers.set(
        'Content-Security-Policy'
        ,
        `
         default-src 'self';
         script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
         style-src 'self' 'nonce-${nonce}';
         img-src 'self' blob: data:;
         font-src 'self';
         object-src 'none';
         base-uri 'self';
         form-action 'self';
         frame-ancestors 'none';
         block-all-mixed-content;
         upgrade-insecure-requests;
         `.replace(/\s{2,}/g, ' ').trim()
    );

    // Pass the nonce via cookies (securely)
    res.cookies.set('nonce', nonce, { httpOnly: true, secure: true, sameSite: 'strict' });

    return res;
}