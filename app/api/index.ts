import { Cards, LatestInvoice, Revenue } from "../lib/definitions";
import { IncomingMessage } from "http";

// サーバーサイドで絶対URLを構築するヘルパー関数
function getAbsoluteUrl(path: string, req?: IncomingMessage): string {
  if (req) {
    // Pages Router (getServerSideProps) から呼び出される場合
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers.host || "localhost:3000";
    return `${protocol}://${host}${path}`;
  }
  
  // App Router (Server Components) から呼び出される場合
  // Next.js 13+では、Server Components内で相対URLを使用すると
  // 自動的に内部URL解決が行われるため、相対URLを返す
  // これにより、デプロイ環境でも環境変数の設定が不要になる
  return path;
}

/**
 * データ取得関数
 * 
 * 【比較の目的】
 * - App Router (Server Components): HTTPリクエストでAPIルートを呼び出す（headers()を使用）
 * - Pages Router (getServerSideProps): HTTPリクエストでAPIルートを呼び出す（reqを使用）
 * 
 * 両方ともHTTPリクエストを使用することで、公平な比較が可能になります。
 * App Routerの優位性（ストリーミング、並列実行）が明確になります。
 */
export async function getCards(req?: IncomingMessage): Promise<Cards> {
  const url = getAbsoluteUrl("/api/cards", req);
  const res = await fetch(url, {
    cache: "no-store",
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
