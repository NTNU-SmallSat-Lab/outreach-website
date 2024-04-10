/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: "http",
                hostname: "localhost",
            },
            {
                protocol: "http",
                hostname: "web.hypso.ies.ntnu.no",
            },
            {
                protocol: "http",
                hostname: "backend",
            },
        ],
    },
};

export default nextConfig;
