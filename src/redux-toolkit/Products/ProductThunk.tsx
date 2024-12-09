import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductsItem } from "../../Types/productTypes";

const fetchProductList = createAsyncThunk(
  "products/fetchProductList",
  async (params, { rejectWithValue }) => {
    try {
      console.log(params)
      const response = await axios.get("https://fakestoreapi.com/products");
      if (response.status === 200) {
        return response.data as ProductsItem[];
      } else {
        throw new Error(response.data);
      }
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export { fetchProductList };
