import { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Layout, Menu, Row, Col, Button, Popover, Typography } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import {
  LocalStorageCartService,
  StorageItem,
  StorageValue,
} from "../Utilities/LocalStorageService";
import CartProductView from "./CartProductView";
import styled from "styled-components";

const { Header } = Layout;
const { Text } = Typography;

const menuList: MenuProps["items"] = ["home", "products", "cart"].map((key) => {
  return {
    key,
    label: key,
  };
});

const MainDivContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  overflow: auto;
  width: 400px;
  height: 400px;
`;

export const HeaderComponent = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(
    location.pathname.split("/")[1] || "home"
  );
  const [CartList, setCartList] = useState<StorageItem>(
    LocalStorageCartService.getData()
  );

  useEffect(() => {}, []);

  const handleRemoveItem = () => {
    setCartList(LocalStorageCartService.getData());
  };

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    navigation(`/${e.key}`);
  };

  const content = (
    <MainDivContainer>
      {CartList && Object.keys(CartList).length > 0 ? (
        <div className="cart-container">
          {Object.values(CartList).map((item: StorageValue) => {
            return (
              <CartProductView
                storageData={item}
                handleRemoveItem={handleRemoveItem}
              />
            );
          })}
        </div>
      ) : (
        <Text type="secondary">There is no item in cart</Text>
      )}
    </MainDivContainer>
  );

  return (
    <Header>
      <Row>
        <Col span={23}>
          <Menu
            theme="dark"
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            defaultSelectedKeys={["home"]}
            items={menuList}
          />
        </Col>
        <Col span={1}>
          <Popover
            content={content}
            title="Title"
            trigger="click"
            onOpenChange={handleRemoveItem}
          >
            <Button shape="circle" icon={<ShoppingCartOutlined />} />
          </Popover>
        </Col>
      </Row>
    </Header>
  );
};
