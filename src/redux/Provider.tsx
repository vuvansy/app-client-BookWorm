'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { useDispatch } from "react-redux";
import { loadCart } from "@/redux/slices/cartSlice";
import { useEffect } from 'react';

function LoadCart() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCart = localStorage.getItem("carts");
    if (storedCart) {
      dispatch(loadCart(JSON.parse(storedCart)));
    }
  }, []);

  return null; // Không render gì hết, chỉ để xử lý load cart
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <LoadCart />
      {children}
    </Provider>
  );
}