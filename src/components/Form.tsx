import React, { useState } from "react";
import Button from "./Button";
import Toast from "./Toast";
import useApi from "../hooks/useApi";
import DynamicField from "./DynamicField";

interface FormField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: any[];
  fields?: FormField[];
  [key: string]: any;
}

interface FormProps {
  inputFields: FormField[];
  data?: any;
  submitBtnTitle?: string;
  api: string;
  closeDrawer: () => void;
  refreshData: () => void;
  grid?: string;
  handleChange?: (name: string, value: any) => void;
}

const Form: React.FC<FormProps> = (props) => {
  const inputFields = props.inputFields;
  const fieldDefault = props.data || {};
  const submitBtnTitle = props.submitBtnTitle || "Submit";
  const [formData, setFormData] = useState<Record<string, any>>(fieldDefault);
  const [toastState, setToastState] = useState({ show: false, message: "", variant: "primary" as const });

  const { Patch, Post } = useApi();

  const showToast = (message: string, variant: "primary" | "success" | "danger" | "warning" | "info" = "primary") => {
    setToastState({ show: true, message, variant });
  };

  const validateField = (value: any, type: string, label: string): string | null => {
    if (!value || value === "") {
      return `${label} is required`;
    }
    if (type === "email" && !/\S+@\S+\.\S+/.test(value)) {
      return `${label} must be a valid email`;
    }
    return null;
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let isFormValid = true;

    inputFields.forEach((field) => {
      const fieldName = field.name;
      const value = formData[fieldName] !== undefined ? formData[fieldName] : fieldDefault[fieldName];

      if (field.required) {
        const validationError = validateField(value, field.type, field.label);
        if (validationError) {
          showToast(validationError, "danger");
          isFormValid = false;
        }
      }
    });

    if (!isFormValid) {
      return;
    }

    const data = { ...fieldDefault, ...formData };
    
    // Convert groups to array of numbers if it's a string
    if (data.groups && typeof data.groups === 'string') {
      data.groups = [parseInt(data.groups)];
    }
    
    // Convert permissions to array of numbers if needed
    if (data.permissions) {
      if (typeof data.permissions === 'string') {
        data.permissions = [parseInt(data.permissions)];
      } else if (Array.isArray(data.permissions)) {
        data.permissions = data.permissions.map((p: any) => typeof p === 'string' ? parseInt(p) : p);
      }
    }

    if (fieldDefault?.id) {
      try {
        await Patch(props.api, fieldDefault.id, data);
        props.closeDrawer();
        props.refreshData();
        showToast("Record updated successfully!", "success");
      } catch (err: any) {
        showToast(err.response?.data?.error || "Error updating record", "danger");
      }
    } else {
      try {
        await Post(props.api, data);
        props.closeDrawer();
        props.refreshData();
        showToast("Record created successfully!", "success");
      } catch (err: any) {
        showToast(err.response?.data?.error || "Error creating record", "danger");
      }
    }
  }

  const handleFieldChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {inputFields.map((field, index) => {
          const fieldName = field.name;
          const defaultValue = fieldDefault[fieldName];

          if (props.grid) {
            return (
              <div className={props.grid} key={index}>
                <DynamicField
                  field={field}
                  defaultValue={defaultValue}
                  handleChange={props.handleChange}
                />
              </div>
            );
          } else {
            return (
              <DynamicField
                key={index}
                field={field}
                defaultValue={defaultValue}
                handleChange={handleFieldChange}
              />
            );
          }
        })}
        <Button variant="primary" type="submit" className="mt-3">
          {submitBtnTitle}
        </Button>
      </form>

      <Toast
        show={toastState.show}
        onClose={() => setToastState({ ...toastState, show: false })}
        message={toastState.message}
        variant={toastState.variant}
      />
    </>
  );
};

export default Form;
