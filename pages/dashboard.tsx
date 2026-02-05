import { GetServerSideProps } from "next";
import { LatestInvoice, Revenue } from "@/app/lib/definitions";
import { getCards, getInvoices, getRevenue } from "@/app/api";
import { lusitana } from "@/app/ui/fonts";
import RevenueChartStatic from "@/app/ui/dashboard/revenue-chart-static";
import LatestInvoicesClient from "@/app/ui/dashboard/latest-invoices-client";
import {
  LoadStatusBadge,
  CardSection,
  DashboardGrid,
  ChartContainer,
} from "@/components/pages-router";

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
}

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (
  context
) => {
  const startTime = Date.now();

  const req = context.req;
  const [cardData, latestInvoices, revenue] = await Promise.all([
    getCards(req),
    getInvoices(req),
    getRevenue(req),
  ]);

  const loadTime = Date.now() - startTime;

  return {
    props: {
      cardData,
      latestInvoices,
      revenue,
      loadTime,
    },
  };
};

export default function Dashboard({
  cardData,
  latestInvoices,
  revenue,
  loadTime,
}: DashboardProps) {
  return (
    <>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard (Pages Router)
      </h1>
      <LoadStatusBadge loadTime={loadTime} />
      <DashboardGrid>
        <CardSection cardData={cardData} />
        <ChartContainer>
          <RevenueChartStatic revenue={revenue} />
        </ChartContainer>
        <ChartContainer>
          <LatestInvoicesClient latestInvoices={latestInvoices} />
        </ChartContainer>
      </DashboardGrid>
    </>
  );
}
