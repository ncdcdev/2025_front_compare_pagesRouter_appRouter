// カード一覧
const mockCardData = {
    totalPaidInvoices: "$52,250.00",
    totalPendingInvoices: "$12,555.00",
    numberOfInvoices: 15,
    numberOfCustomers: 8,
  };

  
  export const fetchCardsDirect = async () => {
    // 0.5秒遅延（データ取得のシミュレーション）
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockCardData;
  };
