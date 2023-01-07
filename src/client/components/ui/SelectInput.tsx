import { Select } from "react-daisyui";

const SelectInput = ({
  label,
  type = "text",
  error,
  descriptionText,
  selectableList,
  placeholder,
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
      <Select className={classes.join(" ")} {...props}>
        <Select.Option value={"default"} disabled>
          {placeholder}
        </Select.Option>
        <>
          {selectableList.map((s) => (
            <Select.Option value={s} key={s}>
              {s}
            </Select.Option>
          ))}
        </>
      </Select>
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
  onChange: (value: unknown) => void;
  type?: string;
  error?: string | any;
  descriptionText?: string;
  placeholder?: string;
  value?: string;
  selectableList: Array<string>;
}

export default SelectInput;
