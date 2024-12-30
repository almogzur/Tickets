

/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; font-src 'self' 'https://fonts.googleapis.com'; img-src 'self' *.somewhere.com; script-src 'self'",
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: "camera=(); battery=(self); geolocation=(); microphone=('https://somewhere.com')",
          },
        ],
      },
    ];
  },
  
}

