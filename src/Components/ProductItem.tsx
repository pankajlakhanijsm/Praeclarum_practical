import { useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Button, Typography } from "antd";
import { ProductsItem } from "../Types/productTypes";
import {
  LocalStorageCartService,
  StorageItem,
  StorageValue,
} from "../Utilities/LocalStorageService";
import { cloneDeep } from "lodash";

const { Meta } = Card;
const { Text } = Typography;

type Props = {
  item: ProductsItem;
  storageData: StorageItem;
};

const ProductViewComponent: React.FC<Props> = (props: Props) => {
  const { item, storageData } = props;
  const [isSelected, setIsSelected] = useState<StorageValue | {}>(
    storageData && storageData[item.id] ? storageData[item.id] : {}
  );

  const handleAddMore = (count: number) => {
    setIsSelected({ ...isSelected, quantity: count });
    LocalStorageCartService.updateItem(item.id, count);
  };

  const handleRemove = (count: number) => {
    if (count > 0) {
      setIsSelected({ ...isSelected, quantity: count });
      LocalStorageCartService.updateItem(item.id, count);
    } else {
      LocalStorageCartService.deleteItem(item.id);
      setIsSelected({});
    }
  };

  const handleAddToCart = () => {
    LocalStorageCartService.addItem(item.id, item);
    const storageValue: StorageValue = cloneDeep(item);
    storageValue.quantity = 1;
    setIsSelected(storageValue);
  };

  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="product-image"
          src={item?.image}
          height="200px"
          width="100p"
          className="product-image"
        />
      }
      actions={
        Object.keys(isSelected).length > 0
          ? [
              <PlusOutlined
                key="setting"
                onClick={() =>
                  handleAddMore(
                    ((isSelected as StorageValue)?.quantity as number) + 1
                  )
                }
              />,
              <Text strong>{(isSelected as StorageValue)?.quantity}</Text>,
              <MinusOutlined
                key="ellipsis"
                onClick={() =>
                  handleRemove(
                    ((isSelected as StorageValue)?.quantity as number) - 1
                  )
                }
              />,
            ]
          : [<Button onClick={handleAddToCart}>Add to Cart</Button>]
      }
    >
      <Meta
        title={item?.title || ""}
        description={`Price: ₹${item?.price}` || ""}
      />
    </Card>
  );
};

export default ProductViewComponent;
