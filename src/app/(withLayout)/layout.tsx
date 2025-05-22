"use client";
import React from "react";

import { Layout, theme } from "antd";
import Sidebar from "@/components/ui/Sidebar";

const { Header, Content, Footer, Sider } = Layout;

const DashboardLayout: React.FC = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
