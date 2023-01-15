import { CustomModal, Error, InputWithLabel, Loading } from "@/components/ui";
import useArtCategory from "@/hooks/useArtCategory";
import { ApiResponse } from "@/types/base";
import { PencilIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Button } from "react-daisyui";
import toast from "react-hot-toast";
import { mutate } from "swr";
import * as Yup from "yup";

export default function ListArtCategory() {
  const { isLoading, isError, category } = useArtCategory();
  const [isEditActive, setEditActive] = useState(false);
  const [selectedArtCategory, setSelectedArtCategory] = useState<any>(null);

  const formik = useFormik({
    initialValues: {
      categoryName: selectedArtCategory?.categoryName || "",
      categoryTag: selectedArtCategory?.categoryTag || "",
      categoryDescription: selectedArtCategory?.categoryDescription || "",
    },
    validationSchema: Yup.object().shape({
      categoryName: Yup.string().required(),
      categoryTag: Yup.string().required(),
      categoryDescription: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      const response = await axios.put(
        "/api/art-category/" + selectedArtCategory._id,
        values
      );
      const { error }: ApiResponse<any> = response.data;
      if (error) {
        toast.error(error.message);
        return;
      }
      mutate("/api/art-category");
      formik.resetForm();
      toast.success("Successfully added creator");
      toggleEditActive();
    },
    enableReinitialize: true,
  });

  const toggleEditActive = (category: any = null) => {
    if (category) {
      setSelectedArtCategory(category);
    } else {
      setSelectedArtCategory(null);
    }
    setEditActive(!isEditActive);
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className="mt-5 w-full">
      <ul className="flex flex-wrap gap-y-5 md:gap-x-1 lg:gap-x-10">
        {category.map((c: any) => {
          return (
            <li
              key={c._id}
              className="relative w-full rounded bg-neutral p-5 text-white md:w-1/4 lg:w-1/6"
            >
              <PencilIcon
                className="absolute top-0 right-0 h-6 w-6 cursor-pointer hover:text-primary"
                onClick={() => toggleEditActive(c)}
              />
              <p>Name : {c.categoryName}</p>
              <p>Tag : {c.categoryTag}</p>
              <p>Description : {c.categoryDescription}</p>
            </li>
          );
        })}
      </ul>
      <CustomModal isVisible={isEditActive} toggleVisible={toggleEditActive}>
        <CustomModal.Header>
          <h1>Edit Art</h1>
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
                  <span>Update Category</span>
                </Button>
              </div>
            </div>
          </form>
        </CustomModal.Body>
      </CustomModal>
    </div>
  );
}
