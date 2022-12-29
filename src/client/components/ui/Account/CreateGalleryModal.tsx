import { ApiResponse } from "@/types/base";
import axios from "axios";
import { useFormik } from "formik";
import { Modal, Button } from "react-daisyui";
import { toast } from "react-hot-toast";
import { useSWRConfig } from "swr";
import * as Yup from "yup";
import InputWithLabel from "../InputWithLabel";

interface Props {
  isVisible: boolean;
  toggleVisible: () => void;
  userId: string;
}

const CreateGalleryModal: React.FC<Props> = ({
  isVisible = false,
  toggleVisible,
  userId,
}) => {
  const { mutate } = useSWRConfig();
  const formik = useFormik({
    initialValues: {
      galleryName: "",
      galleryDescription: "",
    },
    validationSchema: Yup.object().shape({
      galleryName: Yup.string().required(),
      galleryDescription: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      const response = await axios.post("/api/gallery", values);
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
      <Modal.Header className="text-gray-700">
        <span>Enter Gallery Details</span>
      </Modal.Header>
      <Modal.Body className="pb-20 lg:pb-0">
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-1 text-gray-700">
            <InputWithLabel
              type="text"
              label="Gallery Name"
              name="galleryName"
              placeholder="Enter Gallery Name"
              value={formik.values.galleryName}
              error={
                formik.touched.galleryName
                  ? formik.errors.galleryName
                  : undefined
              }
              onChange={formik.handleChange}
            />
            <InputWithLabel
              type="text"
              label="Gallery Description"
              name="galleryDescription"
              placeholder="Enter Gallery Description"
              value={formik.values.galleryDescription}
              error={
                formik.touched.galleryDescription
                  ? formik.errors.galleryDescription
                  : undefined
              }
              onChange={formik.handleChange}
            />
          </div>
          <div className="mt-3">
            <Button
              type="submit"
              color="primary"
              loading={formik.isSubmitting}
              active={formik.dirty}
            >
              <span>Create Gallery</span>
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateGalleryModal;
