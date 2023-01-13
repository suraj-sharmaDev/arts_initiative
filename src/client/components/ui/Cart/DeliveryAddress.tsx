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

export default function DeliveryAddress() {
  const session = useSession();
  const { isError, isLoading, userAddress, mutate } = useUserAddress();
  const [isVisible, setVisible] = useState(false);
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
      toggleModal();
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

  const toggleModal = () => setVisible(!isVisible);

  if (!userAddress || userAddress.length == 0) {
    return (
      <>
        <div className="grid w-full grid-cols-1 bg-white p-3 text-sm">
          <button className="btn-primary btn" onClick={toggleModal}>
            Add Delivery Address
          </button>
        </div>
        <CustomModal isVisible={isVisible} responsive={true}>
          <CustomModal.Header hasCloseBtn={true} closeBtnAction={toggleModal}>
            <h1>Add delivery Address</h1>
          </CustomModal.Header>
          <CustomModal.Body>
            <form onSubmit={formik.handleSubmit}>
              <div className="space-y-1 text-sm">
                <InputWithLabel
                  label="Full Name (Required)*"
                  type="string"
                  value={formik.values.fullName}
                  placeholder="e.g) Sagar Acharya"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.fullName ? formik.errors.fullName : undefined
                  }
                  name="fullName"
                />
                <InputWithLabel
                  label="Phone Number (Required)*"
                  type="number"
                  value={formik.values.phoneNumber}
                  placeholder="e.g) 9710000000"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phoneNumber
                      ? formik.errors.phoneNumber
                      : undefined
                  }
                  name="phoneNumber"
                />
                <div className="grid grid-cols-2 gap-2">
                  <InputWithLabel
                    label="Pincode (Required)*"
                    type="number"
                    value={formik.values.pincode}
                    placeholder="e.g) 22412"
                    onChange={formik.handleChange}
                    error={
                      formik.touched.pincode ? formik.errors.pincode : undefined
                    }
                    name="pincode"
                  />
                  <InputWithLabel
                    label="Landmark"
                    type="text"
                    value={formik.values.landmark}
                    placeholder="e.g) Near city mall"
                    onChange={formik.handleChange}
                    error={
                      formik.touched.landmark
                        ? formik.errors.landmark
                        : undefined
                    }
                    name="landmark"
                  />
                </div>
                <InputWithLabel
                  label="Full Address (Required)*"
                  type="text"
                  value={formik.values.fullAddress}
                  placeholder="e.g) Tulsipur dang, Ghorahi Road"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.fullAddress
                      ? formik.errors.fullAddress
                      : undefined
                  }
                  name="fullAddress"
                />
                <div className="space-y-2">
                  <h1 className="label-text">Type of address</h1>
                  <div className="flex gap-6">
                    <button
                      className={`flex rounded-full border border-gray-300 px-3 py-1 bg-${
                        formik.values.addressType == "home" ? "primary" : "none"
                      } text-${
                        formik.values.addressType == "home"
                          ? "white"
                          : "gray-500"
                      }`}
                      onClick={() =>
                        formik.setFieldValue("addressType", "home")
                      }
                      type="button"
                    >
                      <HomeIcon className="mr-1 h-5 w-5" />
                      <span>Home</span>
                    </button>
                    <button
                      className={`flex rounded-full border border-gray-300 px-3 py-1 bg-${
                        formik.values.addressType == "office"
                          ? "primary"
                          : "none"
                      } text-${
                        formik.values.addressType == "office"
                          ? "white"
                          : "gray-500"
                      }`}
                      onClick={() =>
                        formik.setFieldValue("addressType", "office")
                      }
                      type="button"
                    >
                      <BuildingOffice2Icon className="mr-1 h-5 w-5" />
                      <span>Office</span>
                    </button>
                  </div>
                </div>
                <div className="pt-3">
                  <Button
                    type="submit"
                    color="primary"
                    loading={formik.isSubmitting}
                    active={formik.dirty}
                  >
                    <span>Add Address</span>
                  </Button>
                </div>
              </div>
            </form>
          </CustomModal.Body>
        </CustomModal>
      </>
    );
  }

  const localAddress = userAddress[0];

  return (
    <div className="grid w-full grid-cols-4 bg-white p-3 text-sm">
      <div className="col-span-3 space-y-1">
        <p>
          Deliver to: <b>{localAddress.fullName}</b>
          <span className="ml-5 bg-gray-200 p-1 text-xs capitalize">
            {localAddress.addressType}
          </span>
        </p>
        <p>{localAddress.fullAddress}</p>
      </div>
      <div className="flex justify-end">
        <button className="border border-gray-300 px-3 font-bold text-primary">
          <span>Change</span>
        </button>
      </div>
    </div>
  );
}
