"use client";

import Contents from "@/components/ui/Contents";
import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";
import { isLoggedIn } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode | React.ReactElement;
}) {
  const router = useRouter();
  const userLoggedIn = isLoggedIn();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  return (
    <div className={`h-screen flex gap-3 bg-[#f9fbfc] p-3`}>
      <Sidebar />
      <div className="flex-1 flex flex-col gap-3">
        <Navbar />
        <Contents>{children}</Contents>
      </div>
    </div>
  );
}
