import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./cart-store";

// Define types
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedVariants: string; // Store selected variants as a string (e.g., "Black, 9.5")
}

interface CartState {
  cart: CartItem[];
}

// Initial state
const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart-storage",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, selectedVariants } = action.payload;
      const itemInCart = state.cart.find(
        (item) => item.id === id && item.selectedVariants === selectedVariants
      );

      if (itemInCart) {
        itemInCart.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ id: string; selectedVariants: string }>
    ) => {
      state.cart = state.cart.filter(
        (item) =>
          item.id !== action.payload.id ||
          item.selectedVariants !== action.payload.selectedVariants
      );
    },

    removeAll: (state) => {
      state.cart = [];
    },

    incrementQuantity: (
      state,
      action: PayloadAction<{ id: string; selectedVariants: string }>
    ) => {
      const itemInCart = state.cart.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedVariants === action.payload.selectedVariants
      );
      if (itemInCart) {
        itemInCart.quantity++;
      }
    },

    decrementQuantity: (
      state,
      action: PayloadAction<{ id: string; selectedVariants: string }>
    ) => {
      const itemInCart = state.cart.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedVariants === action.payload.selectedVariants
      );
      if (itemInCart) {
        if (itemInCart.quantity === 1) {
          // Remove item if quantity reaches zero
          state.cart = state.cart.filter(
            (item) =>
              item.id !== action.payload.id ||
              item.selectedVariants !== action.payload.selectedVariants
          );
        } else {
          itemInCart.quantity--;
        }
      }
    },
  },
});

export const getCartTotal = (state: RootState): number =>
  state.cart.cart.reduce(
    (total: number, item: CartItem) => total + item.quantity,
    0
  );

export const {
  addToCart,
  removeFromCart,
  removeAll,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
