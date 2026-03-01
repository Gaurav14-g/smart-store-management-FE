interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
}

export default function Card({
  children,
  title,
  className = '',
  headerClassName = '',
  bodyClassName = ''
}: CardProps) {
  return (
    <div className={`card ${className}`}>
      {title && (
        <div className={`card-header ${headerClassName}`}>
          {title}
        </div>
      )}
      <div className={`card-body ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
}
