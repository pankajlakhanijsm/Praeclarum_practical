import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProductList } from "./ProductThunk";
import { APIstatus } from "../Constant";

export interface ProductState{
    productList: {
        status: string,
        data: any,
    }
}

const initialState: ProductState = {
    productList: {
        status: "",
        data: [],
    }
}

const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProductList.pending.toString(), (state) => {
            state.productList = {
                ...state.productList,
                status: APIstatus.INPROGRESS,
            }
            return state;
        }).addCase(fetchProductList.fulfilled.toString(), (state, {payload}: PayloadAction)=> {
            state.productList = {
                status: APIstatus.SUCCSSS,
                data: payload
            }
            return state;
        }).addCase(fetchProductList.rejected.toString(), (state) => {
            state.productList = {
                ...state.productList,
                status: APIstatus.FAILURE
            }
        })
    }
});

export default productSlice;