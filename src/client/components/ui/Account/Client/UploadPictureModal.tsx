import useArtCategory from "@/hooks/useArtCategory";
import jsonToFormData from "@/lib/jsonToFormData";
import { ApiResponse } from "@/types/base";
import { XCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useFormik } from "formik";
import { Modal, Button } from "react-daisyui";
import { toast } from "react-hot-toast";
import { useSWRConfig } from "swr";
import * as Yup from "yup";
import InputFileWithPreview from "../../InputFileWithPreview";
import InputWithLabel from "../../InputWithLabel";
import SelectInput from "../../SelectInput";

interface Props {
  isVisible: boolean;
  toggleVisible: () => void;
  userId: string | undefined;
  galleryId: string | null | undefined;
  onUploadSuccess?: undefined | (() => void);
  methodType?: string;
  existingArtData?:
    | undefined
    | null
    | {
        _id: string;
        artworkName: string;
        artworkDescription: string;
        artworkImage: any;
        artworkCategory: string;
        artworkPrice: string;
      };
}

const UploadPictureModal: React.FC<Props> = ({
  isVisible = false,
  toggleVisible,
  userId,
  galleryId,
  onUploadSuccess,
  methodType = "POST",
  existingArtData,
}) => {
  const { mutate } = useSWRConfig();
  const { category } = useArtCategory();
  const categoryValues: any = [];

  if (category) {
    category.map((c: any) => categoryValues.push(c.categoryName));
  }

  const formik = useFormik({
    initialValues: {
      artworkName: existingArtData?.artworkName || "",
      artworkDescription: existingArtData?.artworkDescription || "",
      artworkImage: existingArtData?.artworkImage || undefined,
      artworkCategory: existingArtData?.artworkCategory || "",
      artworkPrice: existingArtData?.artworkPrice || "",
    },
    validationSchema: Yup.object().shape({
      artworkName: Yup.string().required(),
      artworkDescription: Yup.string().required(),
      artworkImage: Yup.mixed().required(),
      artworkCategory: Yup.string().required(),
      artworkPrice: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      // we also need to check if file type data is re-updated before sending
      if (!(values.artworkImage instanceof File)) {
        // that means we are not uploading new file so remove this key
        delete values["artworkImage"];
      }
      const formData = jsonToFormData({ ...values, galleryId });
      const response = await axios({
        url:
          "/api/artwork" +
          (methodType == "PUT" ? `/${existingArtData?._id}` : ""),
        method: methodType,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      const { error }: ApiResponse<any> = response.data;
      if (error) {
        toast.error(error.message);
        return;
      }
      const mutateUrl = `/api/gallery` + (userId ? "?userId=${userId}" : "");
      mutate(mutateUrl);
      formik.resetForm();
      toast.success("Successfully added gallery");
      toggleVisible();
      onUploadSuccess && onUploadSuccess();
    },
    enableReinitialize: true,
  });

  return (
    <Modal open={isVisible} onClickBackdrop={toggleVisible} responsive={true}>
      <Modal.Header className="flex items-center text-gray-700">
        <span>Enter Artwork Details</span>
        <button className="absolute -top-0 -right-0" onClick={toggleVisible}>
          <XCircleIcon className="h-8 w-8 text-primary" />
        </button>
      </Modal.Header>
      <Modal.Body className="pb-20 lg:pb-0">
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-1 text-gray-700">
            <InputWithLabel
              type="text"
              label="Artwork Name"
              name="artworkName"
              placeholder="e.g) Amazing artwork"
              value={formik.values.artworkName}
              error={
                formik.touched.artworkName
                  ? formik.errors.artworkName
                  : undefined
              }
              onChange={formik.handleChange}
            />
            <InputWithLabel
              type="text"
              label="Artwork Description"
              name="artworkDescription"
              placeholder="e.g) This amazing artwork defines ..."
              value={formik.values.artworkDescription}
              error={
                formik.touched.artworkDescription
                  ? formik.errors.artworkDescription
                  : undefined
              }
              onChange={formik.handleChange}
            />
            <InputWithLabel
              type="number"
              label="Artwork Price"
              name="artworkPrice"
              placeholder="e.g) 0.0"
              value={formik.values.artworkPrice}
              error={
                formik.touched.artworkPrice
                  ? formik.errors.artworkPrice
                  : undefined
              }
              onChange={formik.handleChange}
            />
            <SelectInput
              label="Artwork Category"
              name="artworkCategory"
              error={
                formik.touched.artworkCategory
                  ? formik.errors.artworkCategory
                  : undefined
              }
              onChange={(value) =>
                formik.setFieldValue("artworkCategory", value)
              }
              selectableList={categoryValues}
              placeholder="Select Category for your artwork"
            />
            <InputFileWithPreview
              label="Upload Picture of Art"
              name="artworkImage"
              error={
                formik.touched.artworkImage
                  ? formik.errors.artworkImage
                  : undefined
              }
              onChange={(event) =>
                formik.setFieldValue(
                  "artworkImage",
                  event.currentTarget.files?.[0]
                )
              }
              uploadedFile={formik.values.artworkImage}
            />
          </div>
          <div className="mt-4">
            <Button
              type="submit"
              color="primary"
              loading={formik.isSubmitting}
              active={formik.dirty}
            >
              <span>
                {methodType == "POST" ? "Upload Picture" : "Update Picture"}
              </span>
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UploadPictureModal;
