import {
  LocalStorageCartService,
  StorageItem,
  StorageValue,
} from "../Utilities/LocalStorageService";
import { Typography, Space, Flex } from "antd";
import CartProductView from "../Components/CartProductView";
import { useState } from "react";

const { Text } = Typography;

export const Cart: React.FC = () => {
  const [CartList, setCartList] = useState<StorageItem>(
    LocalStorageCartService.getData()
  );

  const handleRemoveItem = () => {
    setCartList(LocalStorageCartService.getData());
  };

  return (
    <Flex justify="center" align="center">
      {CartList && Object.keys(CartList).length > 0 ? (
        <Space direction="vertical" size={16} className="cart-container">
          {Object.values(CartList).map((item: StorageValue) => {
            return (
              <CartProductView
                storageData={item}
                handleRemoveItem={handleRemoveItem}
                key={item.id}
              />
            );
          })}
        </Space>
      ) : (
        <Text type="secondary">There is no item in cart</Text>
      )}
    </Flex>
  );
};
