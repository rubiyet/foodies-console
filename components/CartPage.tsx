import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../redux/store";
import { getProductState, setProductss } from "../redux/slices/productSlice";

export default function CartPage() {
  const data = useSelector(getProductState);
  console.log("sss", data);

  const [cart, setCart] = useState<any>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cs = localStorage.getItem("cart");
      console.log("cs", cs);
      if (cs) {
        const cart = JSON.parse(cs);
        setCart(cart);
      }
    }
  }, []);

  return (
    <>
      {cart.map((item: any) =>
        data.products.map((i) => {
          if (i.id === item.item) {
            return (
              <div key={i.id}>
                <h1>{i.name} {item.quantity}</h1>
              </div>
            );
          }
        })
      )}
    </>
  );
}
