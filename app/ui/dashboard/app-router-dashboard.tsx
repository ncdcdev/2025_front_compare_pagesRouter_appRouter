import { Card } from "@/app/ui/dashboard/cards";
import RevenueChartMock from "@/app/ui/dashboard/revenue-chart-mock";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import {
  CardsSkeleton,
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
} from "@/app/ui/skeletons";

import { LoadTimeTracker } from "./load-time-tracker";
import { headers } from "next/headers";

async function getBaseUrl() {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  return `${protocol}://${host}`;
}

async function GetCardData() {
  const baseUrl = await getBaseUrl();
  return await fetch(`${baseUrl}/api/card`, {
    cache: "no-store",
  }).then((res) => res.json());
}

async function GetRevenue() {
  const baseUrl = await getBaseUrl();
  return await fetch(`${baseUrl}/api/revenue`, {
    cache: "no-store",
  }).then((res) => res.json());
}

async function GetLatestInvoices() {
  const baseUrl = await getBaseUrl();
  return await fetch(`${baseUrl}/api/invoices`, {
    cache: "no-store",
  }).then((res) => res.json());
}

async function CardsSection() {
  const startTime = Date.now();
  const cardData = await GetCardData();
  const loadTime = Date.now() - startTime;
  const {
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfInvoices,
    numberOfCustomers,
  } = cardData;

  return (
    <div className="animate-fade-in">
      <LoadTimeTracker sectionName="カード" loadTime={loadTime} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
    </div>
  );
}

async function InvoicesSection() {
  const startTime = Date.now();
  const latestInvoices = await GetLatestInvoices();
  const loadTime = Date.now() - startTime;
  return (
    <div className="animate-fade-in">
      <LoadTimeTracker sectionName="請求書" loadTime={loadTime} />
      <LatestInvoices latestInvoices={latestInvoices} />
    </div>
  );
}

async function RevenueChartSection() {
  const startTime = Date.now();
  const revenue = await GetRevenue();
  const loadTime = Date.now() - startTime;
  return (
    <div className="animate-fade-in">
      <LoadTimeTracker sectionName="チャート" loadTime={loadTime} />
      <RevenueChartMock />
    </div>
  );
}

export default function AppRouterDashboard() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard (App Router)
      </h1>

      {/* カードセクション - Suspenseでラップ */}
      <Suspense fallback={<CardsSkeleton />}>
        <CardsSection />
      </Suspense>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* チャートセクション - Suspenseでラップ */}
        <div className="md:col-span-4">
          <Suspense fallback={<RevenueChartSkeleton />}>
            <RevenueChartSection />
          </Suspense>
        </div>

        {/* 請求書セクション - Suspenseでラップ */}
        <div className="md:col-span-4">
          <Suspense fallback={<LatestInvoicesSkeleton />}>
            <InvoicesSection />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
