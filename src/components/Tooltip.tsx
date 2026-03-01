interface TooltipProps {
  children: React.ReactNode;
  text: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export default function Tooltip({ children, text, placement = 'top' }: TooltipProps) {
  return (
    <span data-bs-toggle="tooltip" data-bs-placement={placement} title={text}>
      {children}
    </span>
  );
}
