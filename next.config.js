
const isProduction = process.env.NODE_ENV === 'production';


const cspHeader = `
    default-src 'self';
    script-src 'self' ${isProduction ? "" : "'unsafe-eval' 'unsafe-inline'"} ;  
    style-src 'self' 'unsafe-inline';
    script-src 'self' ${isProduction ? "" : " 'unsafe-eval' 'unsafe-inline' "} ;  
    style-src 'self' ${isProduction ? "" : " 'unsafe-inline' "};
    img-src 'self' ;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    base-uri 'none';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`

module.exports = {
    reactStrictMode: true,
    poweredByHeader: false,
    output: 'standalone',
    experimental: {
        webVitalsAttribution: ['CLS', 'LCP']
    },
    async headers() {
        return [
            {
                source: '/(.*)',
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
