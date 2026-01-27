import { Cards, LatestInvoice, Revenue } from "../lib/definitions";

// ベースURLを取得するヘルパー関数
function getBaseUrl(req?: { headers: { host?: string | string[] } }): string {
  if (typeof window !== "undefined") {
    // クライアントサイド
    return "";
  }
  
  // サーバーサイド
  const hostHeader = req?.headers?.host;
  const host = Array.isArray(hostHeader) ? hostHeader[0] : hostHeader || process.env.VERCEL_URL || "localhost:3000";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  return `${protocol}://${host}`;
}

export async function getCards(req?: { headers: { host?: string | string[] } }): Promise<Cards> {
  const baseUrl = getBaseUrl(req);
  const cards = await fetch(`${baseUrl}/api/card`).then((res) => res.json());
  return cards;
}

export async function getRevenue(req?: { headers: { host?: string | string[] } }): Promise<Revenue[]> {
  const baseUrl = getBaseUrl(req);
  const revenue = await fetch(`${baseUrl}/api/revenue`).then((res) => res.json());
  return revenue;
}

export async function getInvoices(req?: { headers: { host?: string | string[] } }): Promise<LatestInvoice[]> {
  const baseUrl = getBaseUrl(req);
  const invoices = await fetch(`${baseUrl}/api/invoices`).then((res) => res.json());
  return invoices;
}