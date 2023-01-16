import { BuildingOffice2Icon, HomeIcon } from "@heroicons/react/24/solid";
import { FormikProps } from "formik";
import { Button } from "react-daisyui";
import { InputWithLabel, CustomModal } from "@/components/ui";

interface formikValues {
  fullName: string;
  phoneNumber: string;
  pincode: string;
  landmark: string;
  fullAddress: string;
  addressType: string;
}

interface Props {
  isAddaddressVisible: boolean;
  toggleAddadressModal: () => void;
  formik: FormikProps<formikValues>;
}

export default function AddAddressModal({
  isAddaddressVisible,
  toggleAddadressModal,
  formik,
}: Props) {
  return (
    <CustomModal isVisible={isAddaddressVisible} responsive={true}>
      <CustomModal.Header
        hasCloseBtn={true}
        closeBtnAction={toggleAddadressModal}
      >
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
                  formik.touched.landmark ? formik.errors.landmark : undefined
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
                    formik.values.addressType == "home" ? "white" : "gray-500"
                  }`}
                  onClick={() => formik.setFieldValue("addressType", "home")}
                  type="button"
                >
                  <HomeIcon className="mr-1 h-5 w-5" />
                  <span>Home</span>
                </button>
                <button
                  className={`flex rounded-full border border-gray-300 px-3 py-1 bg-${
                    formik.values.addressType == "office" ? "primary" : "none"
                  } text-${
                    formik.values.addressType == "office" ? "white" : "gray-500"
                  }`}
                  onClick={() => formik.setFieldValue("addressType", "office")}
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
  );
}
