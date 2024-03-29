import { setCookies } from "cookies-next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Card, Error, Loading } from "@/components/ui";
import useUserCart from "@/hooks/useUserCart";

export default function OrderSummary({ isPlaceOrderBtnActive = true }) {
  const session = useSession();
  const router = useRouter();
  const isLoggedIn = session.status == "authenticated";
  const { isLoading, isError, userCart, mutate } = useUserCart();

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const totalItems = userCart.length;
  const totalPrice = userCart.reduce((prevValue: number, cartItem: any) => {
    return (prevValue += Number(cartItem.price) as number);
  }, 0);

  const onPlaceOrder = () => {
    if (isLoggedIn) {
      setCookies("is-place-order", true);
      router.push("/place-order");
    } else {
      setCookies("pending-url", "/cart");
      router.push("auth/login");
    }
  };

  return (
    <div className="static w-full md:fixed md:right-6 md:w-4/12">
      <Card heading="Product Details">
        <Card.Body className="grid grid-cols-2 px-3 py-4">
          <div className="">
            <p>Price ({totalItems} items)</p>
          </div>
          <div className="text-right">Rs. {totalPrice}</div>
        </Card.Body>
        <Card.Footer className="bg-gray-500 text-white">
          <div className="grid grid-cols-2">
            <p>Total</p>
            <p className="text-right">Rs. {totalPrice}</p>
          </div>
        </Card.Footer>
      </Card>
      {isPlaceOrderBtnActive && (
        <div className="fixed bottom-4 left-0 mt-3 grid w-full grid-cols-3 justify-between rounded bg-white px-5 py-2 md:static md:p-2">
          <div className="col-span-2 flex items-center">Rs. {totalPrice}</div>
          <button
            className="btn-primary btn rounded-none"
            onClick={onPlaceOrder}
          >
            <span>{isLoggedIn ? "Place Order" : "Login to place Order"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
