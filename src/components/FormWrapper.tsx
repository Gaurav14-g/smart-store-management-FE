interface FormWrapperProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
}

export default function FormWrapper({ children, onSubmit, className = '' }: FormWrapperProps) {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
}
