import { fetchCardsDirect } from "./getCards";

// Pages Routerから呼び出される場合
export async function GET() {
  const cards = await fetchCardsDirect();
  return Response.json(cards);
}
