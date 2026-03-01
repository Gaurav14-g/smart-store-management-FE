import { useState, useEffect } from 'react';

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  label?: string;
  options: CheckboxOption[];
  value?: string[];
  onChange?: (selected: string[]) => void;
  className?: string;
}

export default function CheckboxGroup({ label, options, value = [], onChange, className = '' }: CheckboxGroupProps) {
  const [selected, setSelected] = useState<string[]>(value);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setSelected(value);
  }, [JSON.stringify(value)]);

  useEffect(() => {
    setSelectAll(selected.length === options.length && options.length > 0);
  }, [selected.length, options.length]);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    const newSelected = checked ? options.map(opt => opt.value) : [];
    setSelected(newSelected);
    onChange?.(newSelected);
  };

  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    const newSelected = checked
      ? [...selected, optionValue]
      : selected.filter(v => v !== optionValue);
    
    setSelected(newSelected);
    setSelectAll(newSelected.length === options.length);
    onChange?.(newSelected);
  };

  return (
    <div className={`mb-3 ${className}`}>
      {label && <label className="form-label fw-bold">{label}</label>}
      
      <div className="border p-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <div className="form-check mb-2 pb-2 border-bottom">
          <input
            className="form-check-input"
            type="checkbox"
            id="select-all"
            checked={selectAll}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
          <label className="form-check-label fw-bold" htmlFor="select-all">
            Select All ({options.length})
          </label>
        </div>

        {options.map((option) => (
          <div key={option.value} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`checkbox-${option.value}`}
              checked={selected.includes(option.value)}
              onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
            />
            <label className="form-check-label" htmlFor={`checkbox-${option.value}`}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
      
      <small className="text-muted">{selected.length} selected</small>
    </div>
  );
}
