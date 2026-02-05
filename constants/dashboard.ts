// グリッド設定
export const GRID = {
  COLUMNS: 4,
  GAP: 6,
  CHART_SPAN: 2,
} as const;

// カード設定
export const CARD_CONFIG = [
  { title: "Collected", type: "collected", key: "totalPaidInvoices" },
  { title: "Pending", type: "pending", key: "totalPendingInvoices" },
  { title: "Total Invoices", type: "invoices", key: "numberOfInvoices" },
  { title: "Total Customers", type: "customers", key: "numberOfCustomers" },
] as const;

// 表示設定
export const DISPLAY = {
  LOAD_TIME_DECIMALS: 0,
} as const;
