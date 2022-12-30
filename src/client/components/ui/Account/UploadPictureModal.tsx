import jsonToFormData from "@/lib/jsonToFormData";
import { ApiResponse } from "@/types/base";
import { XCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useFormik } from "formik";
import { Modal, Button } from "react-daisyui";
import { toast } from "react-hot-toast";
import { useSWRConfig } from "swr";
import * as Yup from "yup";
import InputFileWithPreview from "../InputFileWithPreview";
import InputWithLabel from "../InputWithLabel";

interface Props {
  isVisible: boolean;
  toggleVisible: () => void;
  userId: string;
  galleryId: string | null | undefined;
}

const UploadPictureModal: React.FC<Props> = ({
  isVisible = false,
  toggleVisible,
  userId,
  galleryId,
}) => {
  const { mutate } = useSWRConfig();
  const formik = useFormik({
    initialValues: {
      artworkName: "",
      artworkDescription: "",
      artworkImage: undefined,
    },
    validationSchema: Yup.object().shape({
      artworkName: Yup.string().required(),
      artworkDescription: Yup.string().required(),
      artworkImage: Yup.mixed().required(),
    }),
    onSubmit: async (values) => {
      const formData = jsonToFormData({ ...values, galleryId });
      const response = await axios.post("/api/artwork", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const { error }: ApiResponse<any> = response.data;
      if (error) {
        toast.error(error.message);
        return;
      }
      mutate(`/api/gallery?userId=${userId}`);
      formik.resetForm();
      toast.success("Successfully added gallery");
      toggleVisible();
    },
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
              <span>Upload Picture</span>
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UploadPictureModal;
