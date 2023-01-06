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
import { CreateGalleryModal } from "@/components/ui/Account/Client";

export default function AddCollection() {
  const [isVisible, setVisible] = useState(false);
  const toggleVisible = () => {
    setVisible(!isVisible);
  };

  return (
    <div className="alert bg-primary text-white">
      <h1>Handle Collections</h1>
      <Button
        color="secondary"
        size="md"
        className="w-full md:w-1/3 lg:w-1/6"
        onClick={toggleVisible}
      >
        Add New Collection
      </Button>
      <CreateGalleryModal
        isVisible={isVisible}
        toggleVisible={toggleVisible}
        userId={undefined}
      />
    </div>
  );
}
