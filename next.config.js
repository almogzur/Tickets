
const isProduction = process.env.NODE_ENV === 'production';



    

const cspHeader = `
    default-src 'self';
    script-src 'self' ${isProduction ? "" : "'unsafe-eval' 'unsafe-inline'"};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`

module.exports = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: cspHeader.replace(/\n/g, ''),
                    },
                    {
                        key:'Referrer-Policy',
                        value:'strict-origin-when-cross-origin'
                    },
                    {
                        key: "X-Content-Type-Options",
                        value:"nosniff"
                    }
                      // key : "Subresource Integrity", 

                     /* 
                     Explne : importing CDN Scrips bresource Integrity feature by specifying a base64-encoded cryptographic hash of a
                     resource (file) you're telling the browser to fetch,
                    */

                    // Test Result: Subresource Integrity (SRI) not implemented, but all scripts are loaded from a similar origin.
                    
                ],
            },
        ]
    },
    reactStrictMode: true,
    poweredByHeader: false,
    output: 'standalone',
    experimental: {
        webVitalsAttribution: ['CLS', 'LCP']
    },
}
