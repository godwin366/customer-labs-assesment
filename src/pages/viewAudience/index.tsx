import { useState } from "react";
import "./style.scss";
import Popup from "../../components/modal";
import SaveSegment from "../saveSegment";
import AppButton from "../../components/button";

const ViewAudience = () => {
  const [open, setOpen] = useState(false);
  const [popup, setPopup] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (status = false) => {
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
      setOpen(status);
    }, 300);
  };

  return (
    <div className="view-audience-container">
      <AppButton variant="outlined"  label="Save Segment" onClick={handleOpen}/>
      <Popup
        open={open}
        setOpen={handleClose}
        className={`edit-modal ${popup ? "popupClosed" : ""}`}
        position="right"
      >
        <SaveSegment handleClose={() => handleClose(false)} />
      </Popup>
    </div>
  );
};

export default ViewAudience;
