interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function ContentContainer({ children, className = '' }: ContentContainerProps) {
  return <div className={`container-fluid ${className}`}>{children}</div>;
}
