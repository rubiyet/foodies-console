import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../redux/store";
import { setProductss } from "../redux/slices/productSlice";
import { getCartState, setCart } from "../redux/slices/cartSlice";
import { useQuery } from "react-query";
import { getProducts } from "../lib/helper";
import Image from "next/image";

export default function UserCard() {

  const dispatch = useDispatch();

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
    const cs = localStorage.getItem("cart");
    if (cs) {
      const cart = JSON.parse(cs);
      cart.map((i: any) => {
        if (i.id === item) {
          i.quantity += 1;
        }
      });
      localStorage.setItem("cart", JSON.stringify([...cart, {item, quantity: 1}]));
    } else {
      localStorage.setItem("cart", JSON.stringify([{item, quantity: 1}]));
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-y-10 gap-x-10">
        {data &&
          data.map((item: any) => (
            <div key={item.id} className="w-72 rounded-b-lg">
              <Image
                src={item.image}
                alt="image"
                width={860}
                height={850}
                className="w-72 h-64 rounded-t-lg"
              />
              <div className="bg-white h-20 px-4 py-3 rounded-b-lg space-y-2">
                <div className="flex justify-between items-centers">
                  {item.name}
                  <span>৳{item.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-[0.1rem] text-sm">
                      <Image src="/star.svg" alt="veg" width={14} height={15} />
                      <span>4.7</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-[0.1rem] text-sm">
                      50-79 min
                    </div>
                  </div>
                  <div>
                    <button onClick={() => onClick(item.id)}>
                      <Image
                        src="/iconoir_add-to-cart.svg"
                        alt="veg"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
