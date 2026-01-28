import getRevenue from "./getRevenue";

export async function GET() {
  const revenueData = await getRevenue();
  return Response.json(revenueData);
}
