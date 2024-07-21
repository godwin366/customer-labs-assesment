import React from "react";
import "./style.scss"

interface IProps {
  label?: string;
  className?: string;
  children?: React.ReactElement | string;
}

const Header: React.FC<IProps> = ({ label, className, children }) => {
  return <p className={`app-header ${className || ""}`}>{label || children}</p>;
};

export default Header;
