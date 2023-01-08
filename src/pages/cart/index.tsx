import { ReactElement } from "react";
import type { NextPageWithLayout } from "@/types/index";
import { BaseLayout } from "@/components/layouts";
import useUserCart from "@/hooks/useUserCart";
import { Card, Error, Loading } from "@/components/ui";
import Image from "next/image";
import axios from "axios";

const Cart: NextPageWithLayout = (props) => {
  const { isLoading, isError, userCart, mutate } = useUserCart();

  const onClickRemoveCartItem = async (cartId: string) => {
    await axios.delete("/api/cart/" + cartId);
    mutate();
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  if (userCart == null || userCart?.length == 0) {
    return (
      <div className="flex h-[30rem] w-full items-center justify-center">
        <p>You cart is empty!</p>
      </div>
    );
  }
  const totalItems = userCart.length;
  const totalPrice = userCart.reduce((prevValue: number, cartItem: any) => {
    return (prevValue += Number(cartItem.price) as number);
  }, 0);

  return (
    <div className="relative w-full py-3">
      <div className="static grid w-full grid-cols-1 gap-5 md:absolute md:top-8 md:left-0 md:w-1/2">
        {userCart.map((cart: any) => {
          return (
            <div
              key={cart._id}
              className="flex items-center gap-5 bg-white p-4"
            >
              <Image
                src={"/api/getfile/" + cart.artwork.artworkImage}
                width={100}
                height={100}
                alt={cart.artwork.artworkName}
                className="h-[5rem]"
              />
              <div>
                <p className="text-md font-bold capitalize">
                  {cart.artwork.artworkName}
                </p>
                <p className="text-xl text-primary">
                  Rs. {cart.artwork.artworkPrice}
                </p>
                <button
                  className="btn-error btn text-white"
                  onClick={() => onClickRemoveCartItem(cart._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="static w-full md:fixed md:top-28 md:right-6 md:w-4/12">
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
      </div>
    </div>
  );
};

Cart.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Cart;
