import React from 'react'
import Button, { ButtonProps } from '@mui/material/Button';
import "./style.scss"

interface IProps extends ButtonProps {
   className?: string;
   customVariant?: "cancel";
   label: string
}

const AppButton: React.FC<IProps> = ({ className, label, customVariant, ...rest }) => {
   return (
      <Button className={`common-button ${className} ${customVariant ? `button-${customVariant}` : ""}`} {...rest}>{label}</Button>
   )
}

export default AppButton