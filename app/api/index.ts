import { Cards, LatestInvoice, Revenue } from "../lib/definitions";
import { IncomingMessage } from "http";
import getCards from "./cards/getCards";
import getRevenue from "./revenue/getRevenue";
import getInvoices from "./invoices/getInvoices";

// サーバーサイドで絶対URLを構築するヘルパー関数
function getAbsoluteUrl(path: string, req?: IncomingMessage): string {
  if (req) {
    // Pages Router (getServerSideProps) から呼び出される場合
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers.host || "localhost:3000";
    return `${protocol}://${host}${path}`;
  }
  
  // App Router (Server Components) から呼び出される場合
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  
  const fullUrl = `${baseUrl}${path}`;
  return fullUrl;
}

/**
 * カードデータを取得
 * App Router側（reqがundefined）は直接呼び出し
 * Pages Router側はAPIルートを呼び出す
 */
export async function getCardsData(req?: IncomingMessage): Promise<Cards> {
  // App Router側（reqがundefined）は直接呼び出し
  if (!req) {
    return await getCards();
  }
  
  // Pages Router側はAPIルートを呼び出す
  const url = getAbsoluteUrl("/api/cards", req);
  const res = await fetch(url, {
    cache: "no-store",
  });
  return res.json();
}

// 収益データを取得
 export async function getRevenueData(req?: IncomingMessage): Promise<Revenue[]> {
  // App Router側（reqがundefined）は直接呼び出し
  if (!req) {
    return await getRevenue();
  }
  
  // Pages Router側はAPIルートを呼び出す
  const url = getAbsoluteUrl("/api/revenue", req);
  const res = await fetch(url, {
    cache: "no-store",
  });
  return res.json();
}


// 最新請求書データを取得
export async function getInvoicesData(req?: IncomingMessage): Promise<LatestInvoice[]> {
  // App Router側（reqがundefined）は直接呼び出し
  if (!req) {
    return await getInvoices();
  }
  
  // Pages Router側はAPIルートを呼び出す
  const url = getAbsoluteUrl("/api/invoices", req);
  const res = await fetch(url, {
    cache: "no-store",
  });
  return res.json();
}
