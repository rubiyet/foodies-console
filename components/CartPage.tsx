import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../redux/store";
import { getProductState, setProductss } from "../redux/slices/productSlice";
import Image from "next/image";
import { useQuery } from "react-query";
import { getProducts } from "../lib/helper";

export default function CartPage() {
  const { data, error, isError, isLoading } = useQuery(
    "getProducts",
    getProducts
  );

  const [cart, setCart] = useState<any>([]);
  console.log("cart", cart);

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
      <div className="w-full flex items-center justify-center">
        <div className="grid grid-cols-1 gap-3">
          {cart.length !== 0 ? 
            cart.map((item: any) =>
              data?.map((i:  any) => {
                if (i.id === item.item) {
                  return (
                    <div
                      key={i.id}
                      className="flex items-center bg-white border border-gray-200 h-20 rounded-lg text-xs"
                    >
                      <div className="w-56 flex items-center rounded-r-lg space-x-5">
                        <Image
                          src={i.image}
                          alt="image"
                          width={860}
                          height={850}
                          className="h-20 w-20 rounded-l-lg"
                        />
                        <div className="space-y-1">
                          <div className="text-base">{i.name}</div>
                          <div>৳ {i.price}</div>
                        </div>
                      </div>
                      <div className="w-40 flex items-center justify-center">
                        <div className="flex items-center space-x-2">
                          <Image
                            src="/subtraction.svg"
                            alt="minus"
                            width={15}
                            height={15}
                          />
                          <span>Quantity: </span>
                          {item.quantity}
                          <Image
                            src="/add.svg"
                            alt="minus"
                            width={15}
                            height={15}
                          />
                        </div>
                      </div>
                    </div>
                  );
                }
              })
            )
           : (
            <div className="text-center text-xl">No items in cart</div>
          )}
        </div>
      </div>
    </>
  );
}
