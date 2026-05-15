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
        style={{
          visibility: isOpen ? "visible" : "hidden",
          width: anchor === "end" || anchor === "start" ? "460px" : "auto",
          boxShadow: '-4px 0 24px rgba(0,0,0,0.10)',
          borderLeft: '1px solid #e2e8f0',
          position: 'fixed',
          top: 0,
          bottom: 0,
          height: '100vh',
          zIndex: 1055,
        }}
      >
        <div className="offcanvas-header border-bottom" style={{ padding: '20px 24px', background: '#fff' }}>
          <div>
            <h5 className="offcanvas-title fw-bold mb-0" style={{ color: '#0f172a', fontSize: '1.05rem' }}>
              {data?.id ? updateFormTitle : createFormTitle}
            </h5>
            <p className="text-muted mb-0" style={{ fontSize: '0.8rem', marginTop: 2 }}>
              {data?.id ? 'Update the details below' : 'Fill in the details below'}
            </p>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={handleCloseDrawer}
          ></button>
        </div>
        <div className="offcanvas-body" style={{ padding: '24px', background: '#f8fafc' }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: '20px', border: '1px solid #e2e8f0' }}>
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
