interface InfoTooltipProps {
  text: string;
}

export default function InfoTooltip({ text }: InfoTooltipProps) {
  return (
    <i
      className="bi bi-info-circle text-muted ms-1"
      data-bs-toggle="tooltip"
      title={text}
      style={{ cursor: 'pointer' }}
    ></i>
  );
}
