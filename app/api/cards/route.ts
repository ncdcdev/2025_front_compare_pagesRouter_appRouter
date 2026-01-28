import getCards from "./getCards";

// Pages Routerから呼び出される場合
export async function GET() {
  const cardsData = await getCards();
  return Response.json(cardsData);
}
