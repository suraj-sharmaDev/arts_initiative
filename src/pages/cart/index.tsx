import { ReactElement } from "react";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { NextPageWithLayout } from "@/types/index";
import { BaseLayout } from "@/components/layouts";
import useUserCart from "@/hooks/useUserCart";
import { Error, Loading } from "@/components/ui";
import { inferSSRProps } from "@/lib/inferSSRProps";
import DeliveryAddress from "@/components/interfaces/Cart/DeliveryAddress";
import CartItems from "@/components/interfaces/Cart/CartItems";
import OrderSummary from "@/components/interfaces/Cart/OrderSummary";

const Cart: NextPageWithLayout<
  inferSSRProps<typeof getServerSideProps>
> = () => {
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

  return (
    <div className="relative w-full py-3">
      <div className="static grid w-full grid-cols-1 gap-3 md:absolute md:top-8 md:left-0 md:w-1/2">
        {/* Delivery Address */}
        <DeliveryAddress />
        {/* Cart Items */}
        <CartItems
          items={userCart}
          onClickRemoveCartItem={onClickRemoveCartItem}
        />
      </div>
      {/* Order Summary */}
      <OrderSummary />
    </div>
  );
};

Cart.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale }: GetServerSidePropsContext = context;
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ["common"]) : {}),
    },
  };
};

export default Cart;
