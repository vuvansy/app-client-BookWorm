import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: ICart[];
}


const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCart: (state, action: PayloadAction<ICart[]>) => {
      state.items = action.payload;
    },

    addToCart: (state, action: PayloadAction<{ item: IBook; quantity: number }>) => {
      const { item, quantity } = action.payload;
      const existingItem = state.items.find((cartItem) => cartItem._id === item._id);
      const maxQuantity = item.quantity ?? Infinity; // Lấy số lượng tồn kho

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;


        existingItem.quantity = newQuantity > maxQuantity ? maxQuantity : newQuantity;
      } else {

        const addQuantity = quantity > maxQuantity ? maxQuantity : quantity;
        state.items.push({ _id: item._id, quantity: addQuantity, detail: item });
      }

      localStorage.setItem("carts", JSON.stringify(state.items));
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
      localStorage.removeItem("appliedCoupon");
    },



  },
});

export const {
  loadCart, addToCart, removeFromCart, clearCart,
  decrementQuantity, incrementQuantity, updateQuantity }
  = cartSlice.actions;
export default cartSlice.reducer;
