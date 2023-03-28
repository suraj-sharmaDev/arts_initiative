import { ReactElement, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next/types";

import { DeliveryAddress } from "@/components/interfaces/PlaceOrder";
import { BaseLayout } from "@/components/layouts";
import { getIsPlaceOrderParsedCookies } from "@/lib/cookie";
import { inferSSRProps } from "@/lib/inferSSRProps";
import { NextPageWithLayout } from "@/types/index";
import OrderSummary from "@/components/interfaces/Cart/OrderSummary";

const Steps = ["delivery", "orderSummary", "checkout"];

const PlaceOrder: NextPageWithLayout<
  inferSSRProps<typeof getServerSideProps>
> = () => {
  // place order has four steps
  // 1. delivery where user selects deliveryAddress
  // 2. Order Summary where user can remove items if necessary
  // 3. Payment options where user adds payment
  const [currentStep, setCurrentStep] = useState(Steps[0]);

  const updateCurrentStep = (index: number) => setCurrentStep(Steps[index]);

  return (
    <div className="relative w-full py-3">
      <div className="static grid w-full grid-cols-1 gap-3 md:absolute md:top-8 md:left-0 md:w-1/2">
        <DeliveryAddress
          isEnabled={currentStep == "delivery"}
          stepValue={0}
          updateCurrentStep={updateCurrentStep}
        />
      </div>
      <OrderSummary isPlaceOrderBtnActive={false} />
    </div>
  );
};

PlaceOrder.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // this page is viewable if user has already set
  // cookie to place order
  const isPlaceOrderActive = getIsPlaceOrderParsedCookies(
    context.req,
    context.res
  );
  if (isPlaceOrderActive) {
    const { locale }: GetServerSidePropsContext = context;
    return {
      props: {
        ...(locale ? await serverSideTranslations(locale, ["common"]) : {}),
      },
    };
  } else {
    return {
      redirect: {
        destination: "/cart",
      },
    };
  }
};

export default PlaceOrder;
