import { fetchInvoicesDirect } from "./getInvoices";


// Pages Routerから呼び出される場合
export async function GET() {
  const invoices = await fetchInvoicesDirect();
  return Response.json(invoices);
}
