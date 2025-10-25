import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-1 bg-amber-600 h-full">
      <p>Dashboard root page</p>
    </div>
  );
}
