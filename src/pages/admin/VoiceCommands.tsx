export default function VoiceCommands() {
  const commands = [
    {
      category: 'Product Management',
      items: [
        { command: 'add product [name] price [price]', description: 'Add a new product', example: 'add product laptop price 3000' },
        { command: 'add product [name] price [price] quantity [qty]', description: 'Add product with quantity', example: 'add product mouse price 500 quantity 10' },
        { command: 'update product [name] price [price]', description: 'Update product price', example: 'update product laptop price 3500' },
        { command: 'update product [name] quantity [qty]', description: 'Update product quantity', example: 'update product laptop quantity 25' },
        { command: 'product [name]', description: 'Get product details', example: 'product laptop' },
      ]
    },
    {
      category: 'Stock Management',
      items: [
        { command: 'show all products', description: 'List all products with stock', example: 'show all products' },
        { command: 'check stock', description: 'Check low stock products', example: 'check stock' },
        { command: 'low stock', description: 'Show low stock alert', example: 'low stock' },
      ]
    },
    {
      category: 'Reports & Analytics',
      items: [
        { command: 'generate report', description: 'Generate sales report', example: 'generate report' },
        { command: 'show statistics', description: 'Show store statistics', example: 'show statistics' },
      ]
    },
    {
      category: 'Cart Operations',
      items: [
        { command: 'complete sale', description: 'Complete current sale', example: 'complete sale' },
        { command: 'clear cart', description: 'Clear shopping cart', example: 'clear cart' },
      ]
    }
  ];

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="mb-2">🎤 Voice Commands</h2>
          <p className="text-muted">Click the microphone button and say any of these commands</p>
        </div>
      </div>

      {commands.map((section, idx) => (
        <div key={idx} className="row mb-4">
          <div className="col-12">
            <h5 className="mb-3 text-primary">{section.category}</h5>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Command</th>
                    <th>Description</th>
                    <th>Example</th>
                  </tr>
                </thead>
                <tbody>
                  {section.items.map((item, itemIdx) => (
                    <tr key={itemIdx}>
                      <td>
                        <code className="bg-light p-2 rounded">{item.command}</code>
                      </td>
                      <td>{item.description}</td>
                      <td>
                        <small className="text-muted">{item.example}</small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}

      <div className="row mt-4">
        <div className="col-12">
          <div className="alert alert-info">
            <strong>💡 Tip:</strong> All responses are spoken aloud. You can also see detailed results in the response panel above the microphone button.
          </div>
        </div>
      </div>
    </div>
  );
}
