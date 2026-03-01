export interface BillItem {
  id?: string;
  product: string;
  product_name?: string;
  quantity: number;
  price?: number;
}

export interface Bill {
  id?: string;
  bill_date?: string;
  total_amount?: number;
  user?: string;
  user_name?: string;
  customer?: string;
  customer_name?: string;
  items: BillItem[];
  items_count?: number;
  created_at?: string;
}

export interface SalesReport {
  summary: {
    total_sales: number;
    total_bills: number;
    start_date: string | null;
    end_date: string | null;
  };
  bills: Bill[];
}
