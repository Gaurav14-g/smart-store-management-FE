import { useRef } from 'react';

interface ReceiptItem {
  product_name: string;
  quantity: number;
  price: number;
}

interface ReceiptData {
  id: string;
  bill_date: string;
  total_amount: number;
  user_name: string;
  customer_name?: string;
  items: ReceiptItem[];
}

interface Props {
  bill: ReceiptData;
  onClose: () => void;
}

const BillReceipt = ({ bill, onClose }: Props) => {
  const printRef = useRef<HTMLDivElement>(null);

  const subtotal = bill.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItems = bill.items.reduce((sum, i) => sum + i.quantity, 0);
  const date = new Date(bill.bill_date);
  const dateStr = date.toLocaleDateString('en-US');
  const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const billNo = bill.id.slice(0, 8).toUpperCase();

  const handlePrint = () => {
    const content = printRef.current?.innerHTML;
    const win = window.open('', '_blank', 'width=400,height=700');
    if (!win || !content) return;
    win.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Courier New', monospace; font-size: 12px; width: 300px; padding: 10px; }
            .center { text-align: center; }
            .bold { font-weight: bold; }
            .divider { border-top: 1px dashed #000; margin: 6px 0; }
            .row { display: flex; justify-content: space-between; margin: 2px 0; }
            .item-name { font-weight: bold; }
            .item-sub { color: #555; padding-left: 8px; }
            .large { font-size: 16px; font-weight: bold; }
            .barcode { font-family: 'Libre Barcode 128', monospace; font-size: 40px; letter-spacing: 2px; }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `);
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
        zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}
      onClick={onClose}
    >
      <div
        style={{ background: '#fff', borderRadius: 8, padding: 16, maxHeight: '90vh', overflowY: 'auto', width: 360 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Action buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <button className="btn btn-sm btn-success" onClick={handlePrint}>
            <i className="bi bi-printer me-1"></i> Print
          </button>
          <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Receipt */}
        <div ref={printRef} style={{ fontFamily: "'Courier New', monospace", fontSize: 12, width: '100%' }}>

          {/* Header */}
          <div className="center" style={{ textAlign: 'center', marginBottom: 4 }}>
            <div style={{ fontWeight: 'bold', fontSize: 16 }}>SMART STORE</div>
            <div>Tel: (000) 000 - 0000</div>
            <div>123 Store Street, City 00000</div>
          </div>

          <div className="divider" style={{ borderTop: '1px dashed #000', margin: '6px 0' }} />

          {/* Meta */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
            <span>BILL# {billNo}</span>
            <span>DATE: {dateStr}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
            <span>CASHIER: {bill.user_name?.toUpperCase()}</span>
            <span>TIME: {timeStr}</span>
          </div>
          {bill.customer_name && (
            <div style={{ fontSize: 11 }}>CUSTOMER: {bill.customer_name.toUpperCase()}</div>
          )}

          <div className="divider" style={{ borderTop: '1px dashed #000', margin: '6px 0' }} />

          {/* Items header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: 11 }}>
            <span>ITEM</span>
            <span>AMOUNT</span>
          </div>

          <div className="divider" style={{ borderTop: '1px dashed #000', margin: '6px 0' }} />

          {/* Items */}
          {bill.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: 11 }}>
                <span>{item.product_name.toUpperCase().slice(0, 24)}</span>
                <span>{(item.price * item.quantity).toFixed(2)}</span>
              </div>
              <div style={{ fontSize: 10, paddingLeft: 8, color: '#555' }}>
                {item.quantity} x {Number(item.price).toFixed(2)}
              </div>
            </div>
          ))}

          <div className="divider" style={{ borderTop: '1px dashed #000', margin: '6px 0' }} />

          {/* Totals */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
            <span>SUBTOTAL</span><span>{subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
            <span>TAX (0%)</span><span>0.00</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: 13, marginTop: 2 }}>
            <span>TOTAL</span><span>{Number(bill.total_amount).toFixed(2)}</span>
          </div>

          <div className="divider" style={{ borderTop: '1px dashed #000', margin: '6px 0' }} />

          {/* Items sold */}
          <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, margin: '8px 0' }}>
            # ITEMS SOLD  {totalItems}
          </div>

          <div className="divider" style={{ borderTop: '1px dashed #000', margin: '6px 0' }} />

          {/* Barcode (text-based) */}
          <div style={{ textAlign: 'center', letterSpacing: 3, fontSize: 11, margin: '4px 0', fontWeight: 'bold' }}>
            {'|'.repeat(2)}{'| |'.repeat(8)}{'||'.repeat(3)}
          </div>
          <div style={{ textAlign: 'center', fontSize: 10 }}>
            TC# {bill.id.replace(/-/g, ' ').toUpperCase().slice(0, 19)}
          </div>

          <div className="divider" style={{ borderTop: '1px dashed #000', margin: '6px 0' }} />

          {/* Footer */}
          <div style={{ textAlign: 'center', fontSize: 10 }}>
            <div>Thank you for shopping with us!</div>
            <div>{dateStr}  {timeStr}</div>
            <div style={{ fontWeight: 'bold', marginTop: 4 }}>*** CUSTOMER COPY ***</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BillReceipt;
