import React, { forwardRef } from 'react';
import TextField, { TextFieldProps, TextFieldVariants } from "@mui/material/TextField";
import "./style.scss";

type IProps = {
  errorMessage?: string;
  preLabel?: string;
  className?: string;
  variant?: TextFieldVariants
} & TextFieldProps;

const InputField = forwardRef<HTMLDivElement, IProps>(({
  variant = "outlined",
  preLabel,
  errorMessage,
  className,
  ...props
}, ref) => {
  return (
    <div ref={ref} className="common-input-container">
      {!!preLabel && <p className="common-input-pre-label">{preLabel}</p>}
      <TextField
        {...props}
        variant={variant}
        className={`common-input-field ${className || ""}`}
      />
      {errorMessage ? <div className="error-msg">{errorMessage}</div> : <></>}
    </div>
  );
});

export default InputField;
