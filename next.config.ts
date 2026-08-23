import type { NextConfig } from "next";

const isGithubPagesBuild =
  process.env.GITHUB_ACTIONS === "true" || process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.50.1"],
  ...(isGithubPagesBuild && {
    output: "export",
    basePath: "/musdaa-website",
  }),
  images: {
    unoptimized: isGithubPagesBuild,
  },
};

export default nextConfig;
