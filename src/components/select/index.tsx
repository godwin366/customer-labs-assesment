import {
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { forwardRef } from "react";
import "./style.scss";
import { IRecord } from "../../utils/interface";

type IProps = SelectProps & {
  options: IRecord<any>[];
  label?: string;
  placeHolder?: string;
  labelkey: string;
  valueKey: string;
  className?: string;
  errorMessage?: string;
  onChange: (e: any) => void;
}

const Dropdown = forwardRef<HTMLDivElement, IProps>(({
  options,
  label,
  labelkey,
  valueKey,
  className,
  errorMessage,
  placeHolder,
  onChange,
  ...rest
}, ref) => {
  return (
    <div ref={ref} className="common-select-container">
      <Select
        ref={ref}
        label={label}
        displayEmpty
        renderValue={
          rest.value ? undefined : () => <span style={{ opacity: "0.5" }}>{placeHolder}</span>
        }
        className={`common-drop-down ${className || ""}`}
        onChange={onChange}
        value={rest.value || ""}
        error={!!errorMessage}
        {...rest}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option[valueKey]}>
            {option[labelkey]}
          </MenuItem>
        ))}
      </Select>
      {errorMessage ? <div className="error-msg">{errorMessage}</div> : <></>}
    </div>
  );
});

export default Dropdown;
