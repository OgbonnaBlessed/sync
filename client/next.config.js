/** @type { import('next').NextConfig } */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/**",
            }
        ]
    },
    async rewrites() {
        return [
            {
                source: "/images/:path*", // Proxy all /images/... requests
                destination: "https://d22sszzt99v0q9.cloudfront.net/images/:path*",
            },
        ];
    }
}

export default nextConfig;