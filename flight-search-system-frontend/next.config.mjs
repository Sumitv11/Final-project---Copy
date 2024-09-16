/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.NEXT_API_URL,
    AUTH_URL : process.env.NEXT_PUBLIC_AUTH_URL,
  },
};

export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   env: {
//     API_URL: process.env.NEXT_API_URL,
//     AUTH_URL: process.env.NEXT_AUTH_URL,
//   },
// };

// export default nextConfig;
