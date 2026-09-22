/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['better-sqlite3', 'pdfjs-dist'],
  // Cho phép web app đọc/ghi cây thư mục nghiên cứu ở thư mục gốc repository (ngoài web/).
  outputFileTracingRoot: process.env.NCKH_ROOT || undefined,
};

export default nextConfig;
