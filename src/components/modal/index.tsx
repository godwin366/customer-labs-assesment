import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./style.scss"

interface IProps {
  open: boolean;
  setOpen: (data: boolean) => void;
  children: React.ReactElement;
  position?: "left" | "right";
  className?: string;
}
const Popup: React.FC<IProps> = ({
  children,
  position,
  className,
  open,
  setOpen,
}) => {
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute" as "absolute",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    ...(position
      ? position === "left"
        ? { left: "0", top: "0" }
        : { right: "0", top: "0" }
      : { left: "50%", transform: "translate(-50%, -50%)", top: "50%" }),
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className={`${className || ""}`}>
          {children}
        </Box>
      </Modal>
    </div>
  );
};
export default Popup;
