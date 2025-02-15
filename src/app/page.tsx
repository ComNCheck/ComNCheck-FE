"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("AccessToken"))
        ?.split("=")[1];

      if (!token) {
        router.push("/login"); // 로그인 안 되어 있으면 로그인 페이지로 이동
      } else {
        router.push("/notice"); // 로그인 상태면 공지 페이지로 이동
      }
    }, 100); // 브라우저가 쿠키 업데이트할 시간을 확보
  }, [router]);

  return null;
}
