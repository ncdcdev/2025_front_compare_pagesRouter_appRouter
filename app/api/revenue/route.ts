import { fetchRevenueDirect } from "./getRevenue";

// Pages Routerから呼び出される場合
export async function GET() {
  const revenue = await fetchRevenueDirect();
  return Response.json(revenue);
}
