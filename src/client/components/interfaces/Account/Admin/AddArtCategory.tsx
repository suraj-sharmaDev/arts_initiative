import { useState } from "react";
import { Button } from "react-daisyui";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CustomModal, InputWithLabel } from "@/components/ui";
import axios from "axios";
import { ApiResponse } from "@/types/index";
import toast from "react-hot-toast";
import { mutate } from "swr";

export default function AddArtCategory() {
  const [isVisible, setVisible] = useState(false);
  const toggleVisible = () => {
    setVisible(!isVisible);
  };

  const formik = useFormik({
    initialValues: {
      categoryName: "",
      categoryTag: "",
      categoryDescription: "",
    },
    validationSchema: Yup.object().shape({
      categoryName: Yup.string().required(),
      categoryTag: Yup.string().required(),
      categoryDescription: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      const response = await axios.post("/api/art-category", values);
      const { error }: ApiResponse<any> = response.data;
      if (error) {
        toast.error(error.message);
        return;
      }
      mutate("/api/art-category");
      formik.resetForm();
      toast.success("Successfully added creator");
      toggleVisible();
    },
  });

  return (
    <div className="alert bg-primary text-white">
      <h1>Handle Categories</h1>
      <Button
        color="secondary"
        size="md"
        className="w-full md:w-1/3 lg:w-1/6"
        onClick={toggleVisible}
      >
        Add New Category
      </Button>
      <CustomModal isVisible={isVisible} toggleVisible={toggleVisible}>
        <CustomModal.Header>
          <span>Details for Art Category</span>
        </CustomModal.Header>
        <CustomModal.Body>
          <form
            onSubmit={formik.handleSubmit}
            autoComplete="off"
            autoSave="off"
          >
            <div className="space-y-2 text-gray-700">
              <InputWithLabel
                label={"Category Name"}
                type="text"
                value={formik.values.categoryName}
                name="categoryName"
                placeholder="e.g) Oil Painting"
                error={
                  formik.touched.categoryName
                    ? formik.errors.categoryName
                    : undefined
                }
                onChange={formik.handleChange}
              />
              <InputWithLabel
                label={"Category Description"}
                type="text"
                value={formik.values.categoryDescription}
                name="categoryDescription"
                placeholder="e.g) Painitings created using oil..."
                error={
                  formik.touched.categoryDescription
                    ? formik.errors.categoryDescription
                    : undefined
                }
                onChange={formik.handleChange}
              />
              <InputWithLabel
                label={"Category Tags"}
                type="text"
                value={formik.values.categoryTag}
                name="categoryTag"
                placeholder="e.g) oil painting, oil on canvas, etc..."
                error={
                  formik.touched.categoryTag
                    ? formik.errors.categoryTag
                    : undefined
                }
                onChange={formik.handleChange}
              />
              <div>
                <Button
                  color="primary"
                  type="submit"
                  loading={formik.isSubmitting}
                  active={formik.dirty}
                >
                  <span>Add Category</span>
                </Button>
              </div>
            </div>
          </form>
        </CustomModal.Body>
      </CustomModal>
    </div>
  );
}
