const isProduction = process.env.NODE_ENV === 'production';


const cspHeader = `
    default-src 'self';
    script-src 'self' ${isProduction ? "" : " 'unsafe-eval' 'unsafe-inline' " } ;  
    style-src 'self' ${isProduction ? "" : " 'unsafe-inline' "};
    img-src 'self' ;
    font-src 'self';
    object-src 'none';
    base-uri 'none';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`

 
module.exports = {
        async headers() {
        console.log(isProduction, "production");

            return [
                {
                    source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
                    headers: [
                        {
                            key: 'Content-Security-Policy',
                            value: cspHeader.replace(/\n/g, ''),
                        },
                    ],
                },
            ]
        },
    }
