import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateCartReq } from "./CartThunk";
import { APIstatus } from "../Constant";

export interface CartState {
  updateCartRes: { status: string; data: any };
}

const initialState: CartState = {
  updateCartRes: { status: "", data: [] },
};

const CartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateCartReq.pending.toString(), (state) => {
        state.updateCartRes = {
          ...state.updateCartRes,
          status: APIstatus.INPROGRESS,
        };
        return state;
      })
      .addCase(
        updateCartReq.fulfilled.toString(),
        (state, { payload }: PayloadAction) => {
          state.updateCartRes = {
            status: APIstatus.SUCCSSS,
            data: payload,
          };
          return state;
        }
      )
      .addCase(updateCartReq.rejected.toString(), (state) => {
        state.updateCartRes = {
          ...state.updateCartRes,
          status: APIstatus.FAILURE,
        };
        return state;
      });
  },
});

export default CartSlice;
