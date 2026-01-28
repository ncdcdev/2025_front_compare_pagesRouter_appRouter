// カード一覧
const mockCardData = {
  totalPaidInvoices: "$52,250.00",
  totalPendingInvoices: "$12,555.00",
  numberOfInvoices: 15,
  numberOfCustomers: 8,
};

// Pages Routerから呼び出される場合
export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return Response.json(mockCardData);
}
