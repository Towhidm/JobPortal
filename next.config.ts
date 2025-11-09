import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   reactStrictMode: true,
  images: {
    domains: ['psgxdggbevvjgzcwiqod.supabase.co'], // <-- add your Supabase domain here
  },
};

export default nextConfig;
