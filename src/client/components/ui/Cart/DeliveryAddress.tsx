import { useSession } from "next-auth/react";
import Link from "next/link";
import CustomModal from "../CustomModal";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import useUserAddress from "@/hooks/useUserAddress";
import Loading from "../Loading";
import Error from "../Error";
import InputWithLabel from "../InputWithLabel";
import { Button } from "react-daisyui";
import { ApiResponse } from "@/types/index";
import axios from "axios";
import toast from "react-hot-toast";
import { BuildingOffice2Icon, HomeIcon } from "@heroicons/react/24/solid";
import AddAddressModal from "./AddAddressModal";

export default function DeliveryAddress() {
  const session = useSession();
  const { isError, isLoading, userAddress, mutate } = useUserAddress();
  const [isAddaddressVisible, setAddadressVisible] = useState(false);
  const [isChangeaddressVisible, setChangeaddressVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      pincode: "",
      landmark: "",
      fullAddress: "",
      addressType: "other",
    },
    validationSchema: Yup.object().shape({
      fullName: Yup.string().required(),
      phoneNumber: Yup.string()
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Please enter valid phone number"
        )
        .required(),
      pincode: Yup.string().min(4).max(6).required(),
      landmark: Yup.string(),
      fullAddress: Yup.string().required(),
      addressType: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      const response = await axios.post("/api/address", values);
      const { error }: ApiResponse<any> = response.data;
      if (error) {
        toast.error(error.message);
        return;
      }
      mutate();
      formik.resetForm();
      toast.success("Successfully added gallery");
      toggleAddadressModal();
    },
  });

  if (isError) return <Error />;
  if (isLoading) return <Loading />;

  if (session.status == "unauthenticated") {
    return (
      <div className="grid w-full grid-cols-4 bg-white p-3 text-sm">
        <div className="col-span-3 flex items-center space-y-1">
          <p>You are not logged In.</p>
        </div>
        <div className="flex justify-end">
          <Link
            className="border border-gray-300 px-3 py-2 font-bold text-primary"
            href="/auth/login"
          >
            <span>Login</span>
          </Link>
        </div>
      </div>
    );
  }

  const toggleAddadressModal = () => setAddadressVisible(!isAddaddressVisible);

  const toggleChangeaddressModal = () =>
    setChangeaddressVisible(!isChangeaddressVisible);

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
    toggleChangeaddressModal();
  };

  if (!userAddress || userAddress.length == 0) {
    return (
      <>
        <div className="grid w-full grid-cols-1 bg-white p-3 text-sm">
          <button className="btn-primary btn" onClick={toggleAddadressModal}>
            Add Delivery Address
          </button>
        </div>
        {/* Add delivery address modal */}
        <AddAddressModal
          isAddaddressVisible={isAddaddressVisible}
          formik={formik}
          toggleAddadressModal={toggleAddadressModal}
        />
      </>
    );
  }

  const defaultAddress = userAddress.find(
    (address: any) => address?.isDefault == true
  );

  return (
    <>
      <div className="grid w-full grid-cols-4 bg-white p-3 text-sm">
        <div className="col-span-3 space-y-1">
          <p>
            Deliver to: <b>{defaultAddress.fullName}</b>
            <span className="ml-5 bg-gray-200 p-1 text-xs capitalize">
              {defaultAddress.addressType}
            </span>
          </p>
          <p>{defaultAddress.fullAddress}</p>
        </div>
        <div className="flex justify-end">
          <button
            className="border border-gray-300 px-3 font-bold text-primary"
            onClick={toggleChangeaddressModal}
          >
            <span>Change</span>
          </button>
        </div>
      </div>
      {/* Add delivery address modal */}
      <AddAddressModal
        isAddaddressVisible={isAddaddressVisible}
        formik={formik}
        toggleAddadressModal={toggleAddadressModal}
      />
      {/* Change Delivery Address */}
      <CustomModal
        isVisible={isChangeaddressVisible}
        responsive={true}
        toggleVisible={toggleChangeaddressModal}
      >
        <CustomModal.Header
          hasCloseBtn={true}
          closeBtnAction={toggleChangeaddressModal}
        >
          <h1>Your Addresses</h1>
        </CustomModal.Header>
        <CustomModal.Body>
          <div className="space-y-3">
            <ul className="space-y-3">
              {userAddress.map((address: any) => (
                <li
                  key={address._id}
                  className={`cursor-pointer ${
                    address.isDefault
                      ? "bg-green-200"
                      : "border border-gray-400"
                  } rounded px-2 py-3 text-sm`}
                  onClick={() => changeDefaultAddress(address)}
                >
                  <p>{address.fullName}</p>
                  <p>{address.phoneNumber}</p>
                  <p>{address.fullAddress}</p>
                  <p>{address.addressType}</p>
                </li>
              ))}
            </ul>
            <button
              className="w-full rounded bg-primary p-3 text-white"
              onClick={() => {
                toggleChangeaddressModal();
                toggleAddadressModal();
              }}
            >
              Add New Address
            </button>
          </div>
        </CustomModal.Body>
      </CustomModal>
    </>
  );
}
