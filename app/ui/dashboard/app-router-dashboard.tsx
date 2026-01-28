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
import { getCardsData, getInvoicesData, getRevenueData } from "../../api";


async function CardsSection() {
  const startTime = Date.now();
  const cardData = await getCardsData();
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
  const latestInvoices = await getInvoicesData();
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
  const revenue = await getRevenueData();
  const loadTime = Date.now() - startTime;
  return (
    <div className="animate-fade-in">
      <LoadTimeTracker sectionName="チャート" loadTime={loadTime} />
      <RevenueChartMock revenue={revenue} />
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
