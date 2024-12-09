import reduxStore, { GlobalStore } from "../redux-toolkit/store";
import { fetchProductList } from "../redux-toolkit/Products/ProductThunk";
import { connect } from "react-redux";
import { APIstatus } from "../redux-toolkit/Constant";
import { ProductsItem } from "../Types/productTypes";
import Loader from "../Components/Loader";
import ProductViewComponent from "../Components/ProductItem";
import { Flex, Input } from "antd";
import { LocalStorageCartService } from "../Utilities/LocalStorageService";
import { useEffect, useState } from "react";

reduxStore.dispatch(fetchProductList());
const { Search } = Input;

type Props = {
  product: GlobalStore["product"];
  fetchProductList: () => void;
};

const Products: React.FC<Props> = (props: Props) => {
  const [productList, setProductList] = useState([]);
  const [loader, SetLoader] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (props.product.productList.status === APIstatus.SUCCSSS) {
      setProductList(props.product?.productList?.data);
    }
  }, [props.product.productList.status]);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      if (
        props.product?.productList?.data &&
        Object.keys(props.product?.productList?.data).length
      ) {
        if (searchText) {
          const filteredData = props.product?.productList?.data.filter(
            (e: ProductsItem) => {
              return e.title.toLowerCase().includes(searchText.toLowerCase());
            }
          );
          setProductList(filteredData);
        } else {
          setProductList(props.product?.productList?.data);
        }
      }
      SetLoader(false);
    }, 300);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchText]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchText(value);
    SetLoader(true);
  };

  return (
    <Flex vertical justify="center" align="center">
      <Search
        placeholder="Search Product"
        onChange={handleSearch}
        style={{ width: 500, margin: "20px 0" }}
        value={searchText}
      />
      <Flex wrap gap="small" justify="center" align="center">
        {props.product.productList.status === APIstatus.INPROGRESS || loader ? (
          <Loader />
        ) : (
          productList?.map((item: ProductsItem) => {
            return (
              <ProductViewComponent
                item={item}
                storageData={LocalStorageCartService.getData()}
                key={item.id}
              />
            );
          })
        )}
      </Flex>
    </Flex>
  );
};

const mapStateToProps = (state: GlobalStore) => {
  const { product } = state;
  return { product };
};

const mapDispatchToProps = {
  fetchProductList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
