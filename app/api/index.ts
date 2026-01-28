import { Cards, LatestInvoice, Revenue } from "../lib/definitions";
import { IncomingMessage } from "http";

// サーバーサイドで絶対URLを構築するヘルパー関数
function getAbsoluteUrl(path: string, req?: IncomingMessage): string {
  if (typeof window !== "undefined") {
    // クライアントサイドでは相対URLを使用
    return path;
  }
  
  // サーバーサイドでは絶対URLを構築
  if (req) {
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers.host || "localhost:3000";
    return `${protocol}://${host}${path}`;
  }
  
  // reqが提供されていない場合は環境変数から取得
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return `${baseUrl}${path}`;
}

export async function getCards(req?: IncomingMessage): Promise<Cards> {
  const url = getAbsoluteUrl("/api/card", req);
  const res = await fetch(url, {
    cache: "no-store", // SSRにしたいなら
  });
  return res.json();
}

export async function getRevenue(req?: IncomingMessage): Promise<Revenue[]> {
  const url = getAbsoluteUrl("/api/revenue", req);
  const res = await fetch(url, {
    cache: "no-store",
  });
  return res.json();
}

export async function getInvoices(req?: IncomingMessage): Promise<LatestInvoice[]> {
  const url = getAbsoluteUrl("/api/invoices", req);
  const res = await fetch(url, {
    cache: "no-store",
  });
  return res.json();
}
