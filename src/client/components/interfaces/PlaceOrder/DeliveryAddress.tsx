import axios from "axios";
import toast from "react-hot-toast";
import { Error, Loading } from "@/components/ui";
import useUserAddress from "@/hooks/useUserAddress";
import { ApiResponse } from "@/types/index";
import { CheckIcon } from "@heroicons/react/24/solid";

interface Props {
  isEnabled: boolean;
  stepValue: number;
  updateCurrentStep: (stepValue: number) => void;
}

export default function DeliveryAddress({
  isEnabled,
  stepValue,
  updateCurrentStep,
}: Props) {
  const { isError, isLoading, userAddress, mutate } = useUserAddress();

  if (isError) return <Error />;
  if (isLoading) return <Loading />;

  const changeDefaultAddress = async (address: any) => {
    const response = await axios.put("/api/address/" + address._id, {
      isDefault: true,
    });
    const { error }: ApiResponse<any> = response.data;
    if (error) {
      toast.error(error.message);
      return;
    }
    mutate();
  };

  const defaultAddress = userAddress.find(
    (address: any) => address?.isDefault == true
  );

  if (!isEnabled) {
    return (
      <div>
        {/* Top item info bar */}
        <div className="flex items-center gap-4 rounded bg-primary p-3 text-white">
          <span className="rounded-sm bg-white px-[0.3rem] py-[0.1rem] text-center text-xs text-primary">
            {stepValue + 1}
          </span>
          <span className="text-sm font-semibold uppercase">
            Delivery Address
          </span>
        </div>
        {/* List addresses */}
        <ul className="divide-y-[0.1em]">
          {userAddress.map((address: any) => (
            <li
              className="grid grid-cols-12 items-center bg-white px-3 py-6 text-sm"
              key={address._id}
            >
              <div className="col-span-1">
                <button
                  className="rounded-full border border-primary p-1"
                  onClick={() => changeDefaultAddress(address)}
                >
                  <span
                    className={`block h-2 w-2 rounded-full ${
                      address.isDefault ? "bg-primary" : ""
                    }`}
                  />
                </button>
              </div>
              <div className="col-span-10 flex flex-col space-y-3">
                <button
                  onClick={() => changeDefaultAddress(address)}
                  className=" space-y-2 p-0 text-left"
                >
                  <p className="space-x-3">
                    <b>{address.fullName}</b>
                    <span className="ml-5 bg-gray-200 p-1 text-xs capitalize">
                      {address.addressType}
                    </span>
                    <b>{address.phoneNumber}</b>
                  </p>
                  <p>
                    <span>{address.fullAddress} - </span>
                    <b>{address.pincode}</b>
                  </p>
                </button>
                <button className="w-1/3 bg-red-400 p-2 text-white hover:bg-red-500">
                  <span>Deliver Here</span>
                </button>
              </div>
              <div className="col-span-1">
                <button className="font-semibold text-primary">Edit</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="space-y-3 bg-white py-3">
      {/* Top item info bar */}
      <div className="flex items-center gap-4 rounded bg-white px-3">
        <span className="rounded-sm bg-gray-200 px-[0.3rem] py-[0.1rem] text-center  text-sm text-primary">
          {stepValue + 1}
        </span>
        <span className="text-sm font-semibold uppercase">
          Delivery Address
        </span>
        <span>
          <CheckIcon className="h-5 w-5" />
        </span>
      </div>
      {/* Selected Address info */}
      <div className="px-12">
        <p>
          <b>{defaultAddress.fullName} </b>
          <span>{defaultAddress.fullAddress} - </span>
          <b>{defaultAddress.pincode}</b>
        </p>
      </div>
      {/* Change address button */}
    </div>
  );
}
