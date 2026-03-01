interface FormSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function FormSection({ title, children, className = '' }: FormSectionProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {title && <h5 className="mb-3">{title}</h5>}
      {children}
    </div>
  );
}
