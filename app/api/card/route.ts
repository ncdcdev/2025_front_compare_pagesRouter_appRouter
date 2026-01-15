// カード一覧
export const mockCardData = {
  totalPaidInvoices: "$52,250.00",
  totalPendingInvoices: "$12,555.00",
  numberOfInvoices: 15,
  numberOfCustomers: 8,
};

export async function GET() {
  // 意図的に遅延を追加（比較用）
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return Response.json(mockCardData);
}
