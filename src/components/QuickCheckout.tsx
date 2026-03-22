import { useState } from 'react';
import Input from './Input';
import Button from './Button';

interface QuickCheckoutProps {
  onAddProduct: (productId: string, quantity: number) => void;
  onCheckout: () => void;
  cartTotal: number;
  cartItems: number;
  loading?: boolean;
}

const QuickCheckout = ({ onAddProduct, onCheckout, cartTotal, cartItems, loading }: QuickCheckoutProps) => {
  const [upc, setUpc] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleScan = (productId: string) => {
    onAddProduct(productId, quantity);
    setUpc('');
    setQuantity(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && upc.trim()) {
      handleScan(upc.trim());
    }
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Quick Checkout</h5>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <Input
            label="Scan UPC/Barcode"
            value={upc}
            onChange={(e) => setUpc(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Scan product barcode..."
            autoFocus
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
          />
        </div>

        <Button
          onClick={() => handleScan(upc)}
          variant="primary"
          fullWidth
          disabled={!upc.trim()}
        >
          Add to Cart
        </Button>
      </div>

      <div className="card-footer bg-light">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span>Items: <strong>{cartItems}</strong></span>
          <span>Total: <strong className="text-success">${cartTotal.toFixed(2)}</strong></span>
        </div>
        <Button
          onClick={onCheckout}
          variant="success"
          fullWidth
          disabled={cartItems === 0 || loading}
        >
          {loading ? 'Processing...' : 'Complete Payment'}
        </Button>
      </div>
    </div>
  );
};

export default QuickCheckout;
