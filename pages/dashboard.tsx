import { GetServerSideProps } from "next";
import { Card } from "@/app/ui/dashboard/cards";
import RevenueChartStatic from "@/app/ui/dashboard/revenue-chart-static";
import { LatestInvoice, Revenue } from "@/app/lib/definitions";
import { getCardsData, getInvoicesData, getRevenueData } from "../app/api";
import LatestInvoicesClient from "@/app/ui/dashboard/latest-invoices-client";
import { lusitana } from "@/app/ui/fonts";

interface CardData {
  totalPaidInvoices: string;
  totalPendingInvoices: string;
  numberOfInvoices: number;
  numberOfCustomers: number;
}

interface DashboardProps {
  cardData: CardData;
  latestInvoices: LatestInvoice[];
  revenue: Revenue[];
  loadTime: number;
  isLoading: boolean;
}

// Pages Routerの実際の実装: getServerSidePropsで全データを取得してから一括レンダリング
export const getServerSideProps: GetServerSideProps<DashboardProps> = async (
  context,
) => {
  const startTime = Date.now();

  const req = context.req;
  const cardData = await getCardsData(req);
  const latestInvoices = await getInvoicesData(req);
  const revenue = await getRevenueData(req);
  const loadTime = Date.now() - startTime;

  // サーバーサイドではデータ取得が完了してからpropsを返すため、isLoadingは常にfalse
  return {
    props: {
      cardData,
      latestInvoices,
      revenue,
      loadTime,
      isLoading: false,
    },
  };
};

export default function Dashboard({
  cardData,
  latestInvoices,
  revenue,
  loadTime,
}: DashboardProps) {
  const {
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfInvoices,
    numberOfCustomers,
  } = cardData;

  return (
    <>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard (Pages Router)
      </h1>
      <div className="mb-2 flex items-center gap-1.5 rounded-md bg-green-50 text-green-700 px-2 py-0.5 text-xs">
        ✅ 全データ 取得完了 ({typeof loadTime === 'number' ? loadTime.toFixed(0) : '0'}ms)
      </div>
      <div className="grid grid-cols-4 gap-6">
        {/* すべてのデータが揃ってから一度にレンダリング（ブロッキング） */}
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
        <div className="col-span-2">
          <RevenueChartStatic revenue={revenue} />
        </div>
        <div className="col-span-2">
          <LatestInvoicesClient
            latestInvoices={latestInvoices as LatestInvoice[]}
          />
        </div>
      </div>
    </>
  );
}
