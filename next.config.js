/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // 画像最適化は Vercel の外部ホスト向け
  },

  // ────────────── SPA fallback 用 rewrites ──────────────
  async rewrites() {
    return [
      {
        source: "/:path*", // どのパスも
        destination: "/", // index.html にフォールバック
      },
    ];
  },
};

module.exports = nextConfig;
