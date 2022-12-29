import { Provider, useDispatch, useSelector } from "react-redux";
import { getProductState, setProductss } from "../redux/slices/productSlice";
import { getCartState, setCart } from "../redux/slices/cartSlice";

export default function Product() {

  const data = useSelector(getProductState);
  const data1 = useSelector(getCartState);
  console.log("dataaaaaaaa", data1);

  let content: any;

  if (data) {
    content = JSON.stringify(data);
  }

  return (
    <>
      <p>aaaa</p>
      {data.products.map((item) => (
        <div key={item.id}>
          <h1>{item.name}</h1>
        </div>
      ))}
    </>
  );
}
