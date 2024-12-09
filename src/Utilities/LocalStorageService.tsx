import { LOCALSTORAGE_ITEMS } from "../redux-toolkit/Constant";
import { ProductsItem } from "../Types/productTypes";
import { cloneDeep } from "lodash";

export interface StorageValue extends ProductsItem {
  quantity?: number;
}

export interface StorageItem{
    [key: string|number]: StorageValue
}

export const LocalStorageCartService = {
  getData: () => {
    const data = localStorage.getItem(LOCALSTORAGE_ITEMS.cartItem);
    return data ? JSON.parse(data) : null;
  },

  saveData: (value: StorageItem) => {
    if (value && Object.prototype.toString.call(value) === "[object Object]") {
      localStorage.setItem(LOCALSTORAGE_ITEMS.cartItem, JSON.stringify(value));
    }
  },

  addItem: (productId: number, value: ProductsItem) => {
    if (
      productId &&
      value &&
      Object.prototype.toString.call(value) === "[object Object]"
    ) {
      let cartData = LocalStorageCartService.getData() || {};
      if (value.id && !cartData[value.id] && productId === value.id) {
        const storageValue: StorageValue = cloneDeep(value);
        storageValue.quantity = 1;
        cartData[productId] = storageValue;
      }

      LocalStorageCartService.saveData(cartData);
    }
  },

  deleteItem: (productId: number) => {
    if (productId) {
      let cartData = LocalStorageCartService.getData();
      if (cartData && cartData[productId]) {
        delete cartData[productId];
        LocalStorageCartService.saveData(cartData);
      }
    }
  },

  updateItem: (productId: number, quantity: number) => {
    if (productId) {
      let cartData = LocalStorageCartService.getData();
      if (cartData && cartData[productId]) {
        if (quantity) {
          cartData[productId].quantity = quantity;
        }else{
            cartData[productId].quantity = cartData[productId].quantity + 1;
        }
        LocalStorageCartService.saveData(cartData);
      }
    }
  },
};
