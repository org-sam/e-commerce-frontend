/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React Strict Mode
    reactStrictMode: true,
    // Disable x-powered-by header
    poweredByHeader: false,
    // Ensure we can import from outside src/app if needed (though everything is in src)
    experimental: {
        // typedRoutes: true, // Optional: enable typed routes
    },
    // If you have any image domains to allow, add them here
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
};

export default nextConfig;

