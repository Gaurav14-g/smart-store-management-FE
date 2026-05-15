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
  const [formData, setFormData] = useState<Record<string, any>>({});
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
    
    // Normalize groups
    if (data.groups !== undefined) {
      if (typeof data.groups === 'string') {
        data.groups = data.groups ? [parseInt(data.groups)] : [];
      } else if (Array.isArray(data.groups)) {
        data.groups = data.groups.map((p: any) => typeof p === 'string' ? parseInt(p) : p);
      }
    }
    
    // Normalize permissions
    if (data.permissions !== undefined) {
      if (typeof data.permissions === 'string') {
        data.permissions = data.permissions ? [parseInt(data.permissions)] : [];
      } else if (Array.isArray(data.permissions)) {
        data.permissions = data.permissions.map((p: any) => typeof p === 'string' ? parseInt(p) : p);
      }
    }

    if (fieldDefault?.id) {
      try {
        const changedData: Record<string, any> = {};
        const editableKeys = inputFields.map(f => f.name);
        // Normalize fieldDefault arrays for comparison
        const normalizedDefault: Record<string, any> = { ...fieldDefault };
        if (Array.isArray(normalizedDefault.groups)) {
          normalizedDefault.groups = normalizedDefault.groups.map((g: any) => typeof g === 'object' ? g.id : parseInt(g));
        }
        if (Array.isArray(normalizedDefault.permissions)) {
          normalizedDefault.permissions = normalizedDefault.permissions.map((p: any) => typeof p === 'object' ? p.id : parseInt(p));
        }
        editableKeys.forEach(key => {
          // Only include if user explicitly changed it (exists in formData)
          if (!(key in formData)) return;
          if (JSON.stringify(data[key]) !== JSON.stringify(normalizedDefault[key])) {
            changedData[key] = data[key];
          }
        });
        if (Object.keys(changedData).length === 0) {
          props.closeDrawer();
          return;
        }
        await Patch(props.api, fieldDefault.id, changedData);
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
    setFormData((prev) => {
      if (JSON.stringify(prev[name]) === JSON.stringify(value)) return prev;
      return { ...prev, [name]: value };
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
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
                defaultValue={formData[fieldName] !== undefined ? formData[fieldName] : fieldDefault[fieldName]}
                handleChange={handleFieldChange}
              />
            );
          }
        })}
        <button
          type="submit"
          className="btn w-100 fw-semibold mt-4"
          style={{ background: '#2563eb', color: '#fff', padding: '10px', fontSize: '0.95rem', border: 'none', borderRadius: 8 }}
        >
          {submitBtnTitle}
        </button>
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
