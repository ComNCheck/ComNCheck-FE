"use client";
import SeminarAlert from "@/components/modal/seminarAlert";
import { useRouter } from "next/navigation";

export default function SeminarRoom() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/notice");
  };

  return <SeminarAlert isOpen={true} closeModal={handleClick} />;
}
