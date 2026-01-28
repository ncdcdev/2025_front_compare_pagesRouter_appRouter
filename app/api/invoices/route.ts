import getInvoices from "./getInvoices";

// Pages Routerから呼び出される場合
export async function GET() {
  const invoicesData = await getInvoices();
  return Response.json(invoicesData);
}
