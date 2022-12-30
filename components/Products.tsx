import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../redux/store";
import { setProductss } from "../redux/slices/productSlice";
import { getCartState, setCart } from "../redux/slices/cartSlice";
import { useQuery } from "react-query";
import { getProducts } from "../lib/helper";
import Image from "next/image";

export default function UserCard() {
  const [itemAdded, setItemAdded] = useState(false);
  const dispatch = useDispatch();
  const [cart, setCart] = useState<any>([]);
  console.log("cart", cart);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cs = localStorage.getItem("cart");
      console.log("cs", cs);
      if (cs) {
        const cart1 = JSON.parse(cs);
        setCart(cart1);
      }
    }
  }, [itemAdded, cart]);

  const { data, error, isError, isLoading } = useQuery(
    "getProducts",
    getProducts
  );
  console.log("data", data);

  const [products, setProducts] = React.useState(data);

  useEffect(() => {
    if (data) {
      dispatch(setProductss(data));
    }
  }, [data, dispatch]);

  const data1 = useSelector(getCartState);

  const onClick = (item: number) => {
    setItemAdded(true);
    const cs = localStorage.getItem("cart");
    console.log("cs", cs);
    let isAdded = false;
    if (cs) {
      // const cart = JSON.parse(cs);
      // console.log("cart", cart);
      cart.map((i: any) => {
        if (i.item === item) {
          isAdded = true;
          i.quantity += 1;
        }
        // else {
        //   localStorage.setItem("cart", JSON.stringify([...cart, {item, quantity: 1}]));
        // }
      });

      if (!isAdded) {
        localStorage.setItem(
          "cart",
          JSON.stringify([...cart, { item, quantity: 1 }])
        );
      } else {
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    } else {
      localStorage.setItem("cart", JSON.stringify([{ item, quantity: 1 }]));
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-y-10 gap-x-10">
        {data &&
          data.map((item: any) => {
            let isAdded = false;
            let quantityCount = 0;
            let quantityExist = true;
            {
              cart?.map((i: any) => {
                isAdded = true;
                if (i.item === item.id) {
                  if(i.quantity === item.quantity_available) {
                    quantityExist = false;
                  }
                }
              });
            }
            return (
              <div key={item.id} className="w-44 xl:w-44 2xl:w-56 rounded-b-lg">
                <Image
                  src={item.image}
                  alt="image"
                  width={860}
                  height={850}
                  className="h-48 xl:h-48 2xl:w-64 rounded-t-lg"
                />
                <div className="bg-white h-20 px-4 py-3 rounded-b-lg space-y-2">
                  <div className="flex justify-between items-centers">
                    {item.name}
                    <span>৳{item.price}</span>
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <div className="2xl:flex items-center 2xl:space-x-2 space-y-1 2xl:space-y-0">
                      <div className="flex items-center space-x-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-[0.1rem] xl:text-xs">
                        <Image
                          src="/star.svg"
                          alt="veg"
                          width={14}
                          height={15}
                        />
                        <span>4.7</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-[0.1rem] xl:text-xs">
                        50-79 min
                      </div>
                    </div>
                    <div>
                      {isAdded && quantityExist && (
                        <button onClick={() => onClick(item.id)}>
                          <Image
                            src="/iconoir_add-to-cart.svg"
                            alt="veg"
                            width={20}
                            height={20}
                          />
                        </button>
                      )}
                      {isAdded && !quantityExist && (
                        <button onClick={() => onClick(item.id)}>
                          <Image
                            src="/outOfStock.svg"
                            alt="veg"
                            width={20}
                            height={20}
                          />
                        </button>
                      )}
                      {cart.length === 0 && (
                        <button onClick={() => onClick(item.id)}>
                          <Image
                            src="/iconoir_add-to-cart.svg"
                            alt="veg"
                            width={20}
                            height={20}
                          />
                          {cart.length}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
