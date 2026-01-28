// カード一覧
const mockCardData = {
    totalPaidInvoices: "$52,250.00",
    totalPendingInvoices: "$12,555.00",
    numberOfInvoices: 15,
    numberOfCustomers: 8,
  };
  
  export default async function getCards() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockCardData;
  }