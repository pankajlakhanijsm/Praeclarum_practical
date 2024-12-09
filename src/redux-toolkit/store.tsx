import { configureStore } from "@reduxjs/toolkit";
import CartSlice, { CartState } from "./Cart/CartSlice";
import ProductSlice, {ProductState} from "./Products/ProductSlice";

export type GlobalStore = {
    cart: CartState,
    product: ProductState,
}

const reduxStore = configureStore({
    reducer: {
        cart: CartSlice.reducer,
        product: ProductSlice.reducer,
    }
});

export default reduxStore;