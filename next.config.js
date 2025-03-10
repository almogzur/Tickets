
const isProduction = process.env.NODE_ENV === 'production';
console.log(isProduction, " NEXT-CONFIG");



const cspHeader = `
    default-src 'self' *.cloudinary.com *.sandbox.paypal.com *.paypal.com *.paypalobjects.com *.sandbox.payme.io *.payme.io ;
    script-src 'self' ${isProduction ? "" : "'unsafe-eval' 'unsafe-inline'"}  *.cloudinary.com *.paypal.com *.paypalobjects.com  *.sandbox.paypal.com *.sandbox.payme.io *.payme.io;
    style-src 'self' 'unsafe-inline';
    img-src 'self' *.cloudinary.com *.sandbox.paypal.com *.paypal.com *.paypalobjects.com *.sandbox.payme.io *.payme.io;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self' *.cloudinary.com *.sandbox.paypal.com *.paypal.com *.paypalobjects.com *.sandbox.payme.io *.payme.io ;
    frame-ancestors 'self' *.sandbox.payme.io *.payme.io;
    upgrade-insecure-requests;
`.replace(/\n/g, ''); // Remove newlines for compatibility

const ProdObject = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'Content-Security-Policy', value: cspHeader },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
                    {key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload",
                      },
                ],
            },
        ];
    },
    reactStrictMode: true,
    poweredByHeader: false,
    output: 'standalone',
    experimental: {
        webVitalsAttribution: ['CLS', 'LCP'],
    },
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'res.cloudinary.com' }, // Ensure correct domain
        ],
    },

};

const DevObject = {
    images: {
        remotePatterns: [
          {
            protocol:'https',
            hostname:'**.cloudinary.com',
          },
          {
            protocol:'https',
            hostname:'**.paypal.com ',
          },
          {
            protocol:"https",
            hostname:'**.sandbox.paypal.com'
          },
          {
            hostname:'**.sandbox.payme.io'
          }

        ],
      },

    reactStrictMode: true,
    poweredByHeader: false,


}


module.exports = isProduction? ProdObject : DevObject


