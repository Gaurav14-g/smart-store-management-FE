interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export default function Accordion({ items, className = '' }: AccordionProps) {
  return (
    <div className={`accordion ${className}`} id="accordionExample">
      {items.map((item, index) => (
        <div className="accordion-item" key={item.id}>
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${item.id}`}
            >
              {item.title}
            </button>
          </h2>
          <div
            id={`collapse${item.id}`}
            className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
          >
            <div className="accordion-body">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
