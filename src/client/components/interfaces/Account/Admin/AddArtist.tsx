import { useState } from "react";
import { Button } from "react-daisyui";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CustomModal, InputWithLabel } from "@/components/ui";
import { availableRoles } from "@/lib/roles";
import axios from "axios";
import { ApiResponse } from "@/types/index";
import toast from "react-hot-toast";
import { mutate } from "swr";

export default function AddArtist() {
  const [isVisible, setVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(5).max(10).required(),
    }),
    onSubmit: async (values) => {
      const data = {
        ...values,
        role: availableRoles.artist.id,
      };
      const response = await axios.post("/api/auth/join", data);
      const { error }: ApiResponse<any> = response.data;
      if (error) {
        toast.error(error.message);
        return;
      }
      mutate("/api/admin/artist");
      formik.resetForm();
      toast.success("Successfully added creator");
      toggleVisible();
    },
  });

  const toggleVisible = () => {
    setVisible(!isVisible);
  };

  return (
    <div className="alert bg-primary text-white">
      <h1>Handle Creators</h1>
      <Button
        color="secondary"
        size="md"
        className="w-full lg:w-1/6"
        onClick={toggleVisible}
      >
        Add
      </Button>
      <CustomModal
        isVisible={isVisible}
        toggleVisible={toggleVisible}
        responsive={true}
      >
        <CustomModal.Header hasCloseBtn={true} closeBtnAction={toggleVisible}>
          <span>Add Artist</span>
        </CustomModal.Header>
        <CustomModal.Body>
          <form
            onSubmit={formik.handleSubmit}
            autoComplete="off"
            autoSave="off"
          >
            <div className="space-y-2 text-gray-700">
              <InputWithLabel
                label={"Creator Name"}
                type="text"
                value={formik.values.name}
                name="name"
                error={formik.touched.name ? formik.errors.name : undefined}
                onChange={formik.handleChange}
              />
              <InputWithLabel
                label={"Creator Email"}
                type="email"
                value={formik.values.email}
                name="email"
                error={formik.touched.email ? formik.errors.email : undefined}
                onChange={formik.handleChange}
              />
              <InputWithLabel
                label={"Creator Password"}
                type="password"
                value={formik.values.password}
                name="password"
                error={
                  formik.touched.password ? formik.errors.password : undefined
                }
                onChange={formik.handleChange}
              />
              <div className="mt-5">
                <Button
                  color="primary"
                  type="submit"
                  loading={formik.isSubmitting}
                  active={formik.dirty}
                >
                  <span>Submit Artist Data</span>
                </Button>
              </div>
            </div>
          </form>
        </CustomModal.Body>
      </CustomModal>
    </div>
  );
}
