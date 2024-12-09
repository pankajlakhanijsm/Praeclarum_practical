import { useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Button, Flex } from "antd";
import {
  LocalStorageCartService,
  StorageValue,
} from "../Utilities/LocalStorageService";
import styled from "styled-components";

type Props = {
  storageData: StorageValue;
  handleRemoveItem: () => void;
};

const MainDivContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const QuantityTextNode = styled.span`
  padding: 0 10px;
  font-size: 15px;
  font-weight: 500;
`;

const TitleNode = styled.p`
  line-break: auto;
  text-wrap: wrap;
  font-size: 15px;
  font-weight: 500;
  margin: 5px;
`;

const PriceNode = styled.p`
  line-break: auto;
  text-wrap: wrap;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.45);
  margin: 5px;
`;

const CartProductView: React.FC<Props> = (props: Props) => {
  const { storageData, handleRemoveItem } = props;
  const [isSelected, setIsSelected] = useState<StorageValue | {}>(
    storageData || {}
  );

  const handleAddMore = (count: number) => {
    setIsSelected({ ...isSelected, quantity: count });
    LocalStorageCartService.updateItem(storageData.id, count);
  };

  const handleRemove = (count: number) => {
    if (count > 0) {
      setIsSelected({ ...isSelected, quantity: count });
      LocalStorageCartService.updateItem(storageData.id, count);
    } else {
      LocalStorageCartService.deleteItem(storageData.id);
      setIsSelected({});
      handleRemoveItem();
    }
  };

  return (
    <Card>
      <MainDivContainer>
        <Flex vertical justify="center" align="center">
          <img
            alt="product-image"
            src={storageData?.image}
            height="100px"
            width="100px"
            className="cart-product-image"
          />
          <Flex align="center">
            <Button
              size="small"
              icon={<PlusOutlined />}
              onClick={() =>
                handleAddMore(
                  ((isSelected as StorageValue)?.quantity as number) + 1
                )
              }
            />
            <QuantityTextNode>
              {(isSelected as StorageValue)?.quantity}
            </QuantityTextNode>
            <Button
              size="small"
              icon={<MinusOutlined />}
              onClick={() =>
                handleRemove(
                  ((isSelected as StorageValue)?.quantity as number) - 1
                )
              }
            />
          </Flex>
        </Flex>
        <Flex vertical justify="center" align="left">
          <TitleNode>{storageData?.title || ""}</TitleNode>
          <PriceNode>{`Price: ₹${storageData?.price}` || ""}</PriceNode>
        </Flex>
        <Flex vertical justify="center" align="left">
          <TitleNode>Total price</TitleNode>
          <PriceNode>
            {`₹${
              storageData?.price *
              ((isSelected as StorageValue)?.quantity as number)
            }` || ""}
          </PriceNode>
        </Flex>
      </MainDivContainer>
    </Card>
  );
};

export default CartProductView;
