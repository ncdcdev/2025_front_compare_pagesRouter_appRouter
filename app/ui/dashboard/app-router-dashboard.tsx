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
import { LatestInvoice } from "@/app/lib/definitions";
import { LoadTimeTracker } from "./load-time-tracker";

// モックデータ（比較ページ用）
const mockCardData = {
  totalPaidInvoices: "$52,250.00",
  totalPendingInvoices: "$12,555.00",
  numberOfInvoices: 15,
  numberOfCustomers: 8,
};

const mockLatestInvoices: LatestInvoice[] = [
  {
    id: "1",
    name: "Delba de Oliveira",
    email: "delba@oliveira.com",
    amount: "$2,000.00",
  },
  {
    id: "2",
    name: "Lee Robinson",
    email: "lee@robinson.com",
    amount: "$1,500.00",
  },
  {
    id: "3",
    name: "Hector Simpson",
    email: "hector@simpson.com",
    amount: "$1,200.00",
  },
  {
    id: "4",
    name: "Steven Tey",
    email: "steven@tey.com",
    amount: "$1,000.00",
  },
  {
    id: "5",
    name: "Steph Dietz",
    email: "steph@dietz.com",
    amount: "$800.00",
  },
];

async function DelayedCardData() {
  // 意図的に遅延を追加（ストリーミング可視化用 - 短め）
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockCardData;
}

async function DelayedLatestInvoices() {
  // 意図的に遅延を追加（ストリーミング可視化用 - 長め）
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return mockLatestInvoices;
}

async function CardsSection() {
  const startTime = Date.now();
  const cardData = await DelayedCardData();
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
  const latestInvoices = await DelayedLatestInvoices();
  const loadTime = Date.now() - startTime;
  return (
    <div className="animate-fade-in">
      <LoadTimeTracker sectionName="請求書" loadTime={loadTime} />
      <LatestInvoices latestInvoices={latestInvoices} />
    </div>
  );
}

async function RevenueChartWithTracker() {
  const startTime = Date.now();
  // RevenueChartMockは非同期コンポーネントなので、awaitで待機
  const chartElement = await RevenueChartMock();
  const loadTime = Date.now() - startTime;
  return (
    <div className="animate-fade-in">
      <LoadTimeTracker sectionName="チャート" loadTime={loadTime} />
      {chartElement}
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
            <RevenueChartWithTracker />
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
