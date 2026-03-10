import { useState } from 'react';
import Button from './Button';
import Input from './Input';

interface BarcodeScannerProps {
  onScan: (upc: string) => void;
  loading?: boolean;
}

const BarcodeScanner = ({ onScan, loading }: BarcodeScannerProps) => {
  const [upc, setUpc] = useState('');

  const handleScan = () => {
    if (upc.trim()) {
      onScan(upc.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleScan();
    }
  };

  return (
    <div className="flex gap-2 items-end">
      <div className="flex-1">
        <Input
          label="Scan UPC Barcode"
          value={upc}
          onChange={(e) => setUpc(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter or scan UPC code"
          disabled={loading}
        />
      </div>
      <Button onClick={handleScan} disabled={!upc.trim() || loading}>
        {loading ? 'Scanning...' : 'Scan'}
      </Button>
    </div>
  );
};

export default BarcodeScanner;
