
const isProduction = process.env.NODE_ENV === 'production';



    

const cspHeader = `
    default-src 'self';
    script-src 'self' ${isProduction ? "" : "'unsafe-eval' 'unsafe-inline'"};
    style-src 'self' 'unsafe-inline;
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
