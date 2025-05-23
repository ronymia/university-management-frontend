"use client";
import React, { useEffect, useState } from "react";

import { Layout } from "antd";
import Sidebar from "@/components/ui/Sidebar";
import Contents from "@/components/ui/Contents";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/services/auth.service";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const userLoggedIn = isLoggedIn();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    } else {
      setIsLoading(true);
    }
  }, [router]);

  if (!isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Contents>{children}</Contents>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
