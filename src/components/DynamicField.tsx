import React from "react";
import TextInput from "./TextInput";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import NumberInput from "./NumberInput";
import Textarea from "./Textarea";
import Select from "./Select";
import MultiSelect from "./MultiSelect";
import RadioGroup from "./RadioGroup";
import Checkbox from "./Checkbox";
import SwitchToggle from "./SwitchToggle";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import FileUpload from "./FileUpload";
import CheckboxGroup from "./CheckboxGroup";

interface DynamicFieldProps {
  field: any;
  defaultValue?: any;
  handleChange?: (name: string, value: any) => void;
}

const DynamicField: React.FC<DynamicFieldProps> = ({ field, defaultValue, handleChange }) => {
  const onChange = (e: any) => {
    if (handleChange) {
      const value = e.target ? e.target.value : e;
      handleChange(field.name, value);
    }
  };

  switch (field.type) {
    case "text":
      return (
        <TextInput
          label={field.label}
          value={defaultValue}
          onChange={onChange}
          placeholder={field.placeholder}
          required={field.required}
          id={field.name}
        />
      );

    case "email":
      return (
        <EmailInput
          label={field.label}
          value={defaultValue}
          onChange={onChange}
          placeholder={field.placeholder}
          required={field.required}
          id={field.name}
        />
      );

    case "password":
      return (
        <PasswordInput
          label={field.label}
          value={defaultValue}
          onChange={onChange}
          placeholder={field.placeholder}
          required={field.required}
          id={field.name}
        />
      );

    case "number":
      return (
        <NumberInput
          label={field.label}
          value={defaultValue}
          onChange={onChange}
          placeholder={field.placeholder}
          required={field.required}
          min={field.min}
          max={field.max}
          step={field.step}
          id={field.name}
        />
      );

    case "textarea":
      return (
        <Textarea
          label={field.label}
          value={defaultValue}
          onChange={onChange}
          placeholder={field.placeholder}
          required={field.required}
          rows={field.rows}
          id={field.name}
        />
      );

    case "select":
      return (
        <Select
          label={field.label}
          value={Array.isArray(defaultValue) ? String(defaultValue[0] || '') : defaultValue}
          onChange={onChange}
          options={field.options || []}
          placeholder={field.placeholder}
          required={field.required}
          id={field.name}
        />
      );

    case "multi-select":
      return (
        <MultiSelect
          label={field.label}
          value={defaultValue}
          onChange={(selected) => handleChange?.(field.name, selected)}
          options={field.options || []}
          id={field.name}
        />
      );

    case "checkbox-group":
      return (
        <CheckboxGroup
          label={field.label}
          value={defaultValue}
          onChange={(selected) => handleChange?.(field.name, selected)}
          options={field.options || []}
        />
      );

    case "radio":
      return (
        <RadioGroup
          label={field.label}
          name={field.name}
          value={defaultValue}
          onChange={(value) => handleChange?.(field.name, value)}
          options={field.options || []}
          inline={field.inline}
        />
      );

    case "checkbox":
      return (
        <>
          <Checkbox
            label={field.label}
            checked={defaultValue}
            onChange={(checked) => handleChange?.(field.name, checked)}
            id={field.name}
          />
          <input
            type="hidden"
            name={field.name}
            value={defaultValue ? "true" : "false"}
          />
        </>
      );

    case "switch":
      return (
        <>
          <SwitchToggle
            label={field.label}
            checked={defaultValue}
            onChange={(checked) => handleChange?.(field.name, checked)}
            id={field.name}
          />
          <input
            type="hidden"
            name={field.name}
            value={defaultValue ? "true" : "false"}
          />
        </>
      );

    case "date":
      return (
        <DatePicker
          label={field.label}
          value={defaultValue}
          onChange={onChange}
          required={field.required}
          id={field.name}
        />
      );

    case "time":
      return (
        <TimePicker
          label={field.label}
          value={defaultValue}
          onChange={onChange}
          required={field.required}
          id={field.name}
        />
      );

    case "file":
      return (
        <FileUpload
          label={field.label}
          onChange={(files) => handleChange?.(field.name, files)}
          accept={field.accept}
          multiple={field.multiple}
          required={field.required}
          id={field.name}
        />
      );

    default:
      return (
        <TextInput
          label={field.label}
          value={defaultValue}
          onChange={onChange}
          placeholder={field.placeholder}
          required={field.required}
          id={field.name}
        />
      );
  }
};

export default DynamicField;
