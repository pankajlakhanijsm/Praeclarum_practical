import { Route, Routes, Navigate } from "react-router-dom";
import { Home, Cart } from "../Pages";
import { HeaderComponent } from "../Components/Header";
import { Layout } from "antd";
import styled from "styled-components";
import Products from "../Pages/Products";

const { Content } = Layout;

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
`;

const AppLayout: React.FC = () => {
  return (
    <Layout>
      <HeaderComponent />
      <Content style={{ padding: "24px" }}>
        <Wrapper>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<Products />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Wrapper>
      </Content>
    </Layout>
  );
};
export default AppLayout;
