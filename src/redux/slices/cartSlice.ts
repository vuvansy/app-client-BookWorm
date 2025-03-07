import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  _id: string;
  quantity: number;
  detail: IBook;
}

interface CartState {
  items: CartItem[];
}


const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    addToCart: (state, action: PayloadAction<{ item: IBook; quantity: number }>) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload.item._id
      );

      const maxQuantity = action.payload.item.quantity ?? 0;

      if (existingItem) {
        const newQuantity = existingItem.quantity + action.payload.quantity;
        existingItem.quantity = newQuantity > maxQuantity ? maxQuantity : newQuantity;

      }
      else {
        const addQuantity =
          action.payload.quantity > maxQuantity
            ? maxQuantity
            : action.payload.quantity;

        state.items.push({
          _id: action.payload.item._id,
          quantity: addQuantity,
          detail: action.payload.item,
        });
      }
      const carts = JSON.stringify(state.items)
      localStorage.setItem("carts", carts);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload
      );
      localStorage.setItem("carts", JSON.stringify(state.items));
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem("carts", JSON.stringify(state.items));
      }
    },

    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i._id === action.payload);
      if (item) {
        const maxQuantity = item.detail.quantity ?? 10;
        if (item.quantity < maxQuantity) {
          item.quantity++;
          localStorage.setItem("carts", JSON.stringify(state.items));
        }
      }
    },

    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(i => i._id === action.payload.id);
      if (item) {
        const maxQuantity = item.detail.quantity ?? 10;
        item.quantity = Math.min(action.payload.quantity, maxQuantity);
        localStorage.setItem("carts", JSON.stringify(state.items));
      }
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("carts");
    },



  },
});

export const {
  loadCart, addToCart, removeFromCart, clearCart,
  decrementQuantity, incrementQuantity, updateQuantity }
  = cartSlice.actions;
export default cartSlice.reducer;
