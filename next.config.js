/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: { 
    domains: ["slhefnckbicemflujgya.supabase.co"] 
  },
};

module.exports = nextConfig;
