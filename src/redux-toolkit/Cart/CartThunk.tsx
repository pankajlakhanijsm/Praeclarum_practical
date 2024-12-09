import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type CartItems = {
  name: string;
  quantity: number;
  pricePerItem: number;
};

const updateCartReq = createAsyncThunk(
  "cart/updateCartReq",
  async (params: CartItems[]) => {
    try {
      const updateCartRes = await axios.post("", params);
      return updateCartRes;
    } catch (err) {
      console.log(err);
    }
  }
);

export { updateCartReq };
