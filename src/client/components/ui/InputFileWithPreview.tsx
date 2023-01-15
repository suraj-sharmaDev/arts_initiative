import { FileInput } from "react-daisyui";

const InputFileWithPreview = ({
  label,
  name,
  error,
  descriptionText,
  uploadedFile,
  ...props
}: InputProps) => {
  const classes = Array<string>();

  if (error) {
    classes.push("input-error");
  }

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <div className="flex w-full items-center">
        <FileInput
          className={classes.join(" ")}
          {...props}
          type={"file"}
          accept="image/png, image/jpeg"
        />
        {uploadedFile && (
          <div>
            <img
              src={
                uploadedFile instanceof File
                  ? URL.createObjectURL(uploadedFile)
                  : (uploadedFile as string)
              }
              className="h-24 w-24"
            />
          </div>
        )}
      </div>
      {(error || descriptionText) && (
        <label className="label">
          <span className={`label-text-alt ${error ? "text-red-500" : ""}`}>
            {error || descriptionText}
          </span>
        </label>
      )}
    </div>
  );
};

interface InputProps {
  label: string;
  name: string;
  onChange?(x: React.ChangeEvent<HTMLInputElement>): void;
  error?: string | any;
  descriptionText?: string;
  uploadedFile: undefined | Blob | MediaSource | string;
}

export default InputFileWithPreview;
