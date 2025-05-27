"use client";
import React, { useEffect, useState } from "react";

import { Layout, Row, Space, Spin } from "antd";
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
    return (
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Space>
          <Spin tip="Loading" size="large">
            <div style={{ padding: 50 }} /> {/* dummy content */}
          </Spin>
        </Space>
      </Row>
    );
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
