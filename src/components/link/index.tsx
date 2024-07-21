import React, { ReactNode } from 'react'
import "./style.scss"

interface IProps {
   label?: string;
   onClick: () => void;
   className?: string
   children?: ReactNode
}
const Link: React.FC<IProps> = ({ label, onClick, className, children }) => {
   return (
      <div onClick={onClick} className={`common-Link ${className}`}>{label || children}</div>
   )
}

export default Link