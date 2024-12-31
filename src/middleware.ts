import { NextRequest, NextResponse } from 'next/server'
// script-src 'self' 'strict-dynamic' 'nonce-${nonce}' 'strict-dynamic'; ${isProduction ? "" : " 'unsafe-eval' 'unsafe-inline' "} ;
// style - src 'self' 'nonce-${nonce}' ${ isProduction ? "" : " 'unsafe-inline' " };
//


const isProduction = process.env.NODE_ENV === 'production';


export function middleware(request: NextRequest) {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

    const cspHeaderProd = `
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    default-src 'self';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
    `;
    
   const  cspHeaderDev = `
        script-src 'self'  'unsafe-eval' ; 
        style-src 'self' 'unsafe-inline';
        default-src 'self';
        img-src 'self' blob: data:;
        font-src 'self';
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        block-all-mixed-content;
        upgrade-insecure-requests;
        `;
    

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-nonce', nonce)
    requestHeaders.set(
        'Content-Security-Policy',
        // Replace newline characters and spaces
        isProduction ? cspHeaderProd.replace(/\s{2,}/g, ' ').trim() : cspHeaderDev.replace(/\s{2,}/g, ' ').trim() 
    )

    return NextResponse.next({
        headers: requestHeaders,
        request: {
            headers: requestHeaders,
        },
    })
}
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },
    ],
}