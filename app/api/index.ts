import { Cards, LatestInvoice, Revenue } from "../lib/definitions";
import { IncomingMessage } from "http";
import { fetchCardsDirect } from "./cards/getCards";
import { fetchRevenueDirect } from "./revenue/getRevenue";
import { fetchInvoicesDirect } from "./invoices/getInvoices";


function getAbsoluteUrl(path: string, req?: IncomingMessage): string {
  if (req) {
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers.host || "localhost:3000";
    return `${protocol}://${host}${path}`;
  }
  return path;
}

/**
 * データ取得の入口
 * - App Router: 直接取得（Streaming可）
 * - Pages Router: API経由（ブロッキング）
 */
export async function getCards(req?: IncomingMessage): Promise<Cards> {
  if (!req) {
    // App Router
    return fetchCardsDirect();
  }

  // Pages Router
  const url = getAbsoluteUrl("/api/cards", req);
  const res = await fetch(url, { cache: "no-store" });
  return res.json();
}

export async function getRevenue(req?: IncomingMessage): Promise<Revenue[]> {
  if (!req) {
    // App Router
    return fetchRevenueDirect();
  }

  // Pages Router
  const url = getAbsoluteUrl("/api/revenue", req);
  const res = await fetch(url, { cache: "no-store" });
  return res.json();
}

export async function getInvoices(req?: IncomingMessage): Promise<LatestInvoice[]> {
  if (!req) {
    // App Router
    return fetchInvoicesDirect();
  }

  // Pages Router
  const url = getAbsoluteUrl("/api/invoices", req);
  const res = await fetch(url, { cache: "no-store" });
  return res.json();
}
