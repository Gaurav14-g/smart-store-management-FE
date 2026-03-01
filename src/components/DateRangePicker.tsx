interface DateRangePickerProps {
  label?: string;
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEndDateChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

export default function DateRangePicker({ label, startDate, endDate, onStartDateChange, onEndDateChange, required, className = '' }: DateRangePickerProps) {
  return (
    <div className={`mb-3 ${className}`}>
      {label && <label className="form-label">{label}</label>}
      <div className="row g-2">
        <div className="col">
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={onStartDateChange}
            required={required}
            placeholder="Start Date"
          />
        </div>
        <div className="col-auto d-flex align-items-center">
          <span>to</span>
        </div>
        <div className="col">
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={onEndDateChange}
            required={required}
            placeholder="End Date"
          />
        </div>
      </div>
    </div>
  );
}
