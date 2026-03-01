import React, { useState } from "react";
import Button from "./Button";
import Form from "./Form";

interface FormWithDrawerProps {
  anchor?: "start" | "end" | "top" | "bottom";
  actionBtnName: string;
  data?: any;
  buttonVariant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
  buttonStyle?: React.CSSProperties;
  updateFormTitle?: string;
  createFormTitle?: string;
  submitBtnTitle?: string;
  inputFields: any[];
  api: string;
  refreshData: () => void;
}

const FormWithDrawer: React.FC<FormWithDrawerProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const anchor = props.anchor || "end";
  const actionBtnName = props.actionBtnName;
  const data = props.data;
  const buttonVariant = props.buttonVariant || "primary";
  const updateFormTitle = props.updateFormTitle || "";
  const createFormTitle = props.createFormTitle || "";
  const submitBtnTitle = props.submitBtnTitle || "Submit";

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseDrawer = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={toggleDrawer} variant={buttonVariant} style={props.buttonStyle}>
        {actionBtnName}
      </Button>

      <div
        className={`offcanvas offcanvas-${anchor} ${isOpen ? "show" : ""}`}
        tabIndex={-1}
        style={{ visibility: isOpen ? "visible" : "hidden", width: anchor === "end" || anchor === "start" ? "500px" : "auto" }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">
            {data?.id ? updateFormTitle : createFormTitle}
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={handleCloseDrawer}
          ></button>
        </div>
        <div className="offcanvas-body">
          <Form
            closeDrawer={handleCloseDrawer}
            refreshData={props.refreshData}
            submitBtnTitle={submitBtnTitle}
            inputFields={props.inputFields}
            api={props.api}
            data={data}
          />
        </div>
      </div>

      {isOpen && (
        <div
          className="offcanvas-backdrop fade show"
          onClick={handleCloseDrawer}
        ></div>
      )}
    </>
  );
};

export default FormWithDrawer;
