// //import withPWA from "next-pwa";
// import type { NextConfig } from "next";

// // PWA 설정
// const pwaConfig = {
//   dest: "public", // 서비스 워커가 저장될 경로
//   register: true, // PWA 자동 등록
//   skipWaiting: true, // 새로운 서비스 워커가 즉시 활성화되도록 설정
//   disable: process.env.NODE_ENV === "development", // 개발 모드에서는 PWA 비활성화
// };
// const withPWA = require("next-pwa")({
//   dest: "public",
//   disable: process.env.NODE_ENV === "development",
// });

// // 기본 Next.js 설정
// const nextConfig: NextConfig = {
//   reactStrictMode: true, // Next.js의 reactStrictMode는 기본 설정에서 관리
//   compiler: {
//     styledComponents: true,
//   },
//   images: {
//     domains: ["storage.googleapis.com"],
//   },
// };

// module.exports = withPWA(nextConfig);
// // PWA 설정을 nextConfig에 합침
// export default withPWA({
//   ...nextConfig,
//   ...pwaConfig, // PWA 관련 설정을 분리해서 추가
// });

// import type { NextConfig } from "next";
// const withPWA = require("next-pwa");

// const pwaConfig = {
//   dest: "public",
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === "development",
// };

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   compiler: {
//     styledComponents: true,
//   },
//   images: {
//     domains: ["storage.googleapis.com"],
//   },
// };

// module.exports = withPWA(pwaConfig)(nextConfig);\

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  // 다른 Next.js 설정들
  reactStrictMode: true,
});
