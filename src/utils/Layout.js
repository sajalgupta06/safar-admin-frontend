import React, { Suspense, useContext } from "react";
import SideBar from "../components/sidebar";
import Navbar from "../components/Navbar/Navbar";
import { Breadcrumb, Layout, theme } from "antd";
import { MyContext } from "../App";
import Loading from "../components/Loader/Loading";
import NoSpinLoader from "../components/Loader/NoSpinLoader";
const { Content, Header, Sider } = Layout;

export default function AppLayout({ children }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const context = useContext(MyContext);

  return (
    <>
      <Layout>
        <header>
          <Navbar></Navbar>
        </header>
        <Layout>
          <Sider collapsed={context.IsSideBarCollapsed}>
            <SideBar></SideBar>
          </Sider>
          <Layout
            style={{
              padding: "0 24px 24px",
            }}
          >
            {/* <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}

            {context.loading && <Loading></Loading>}
            {context.noSpinLoading && <NoSpinLoader></NoSpinLoader>}
            <Content
              style={{
                padding: 24,
                marginTop: "1rem",
                minHeight: 280,
                background: colorBgContainer,
                boxShadow: "0px 12px 23px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Suspense>{children}</Suspense>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}
