import { Card } from "@/app/ui/dashboard/cards";
import { CARD_CONFIG } from "@/constants/dashboard";

interface CardData {
  totalPaidInvoices: string;
  totalPendingInvoices: string;
  numberOfInvoices: number;
  numberOfCustomers: number;
}

interface CardSectionProps {
  cardData: CardData;
}

export const CardSection = ({ cardData }: CardSectionProps) => {
  return (
    <>
      {CARD_CONFIG.map((config) => (
        <Card
          key={config.key}
          title={config.title}
          value={cardData[config.key]}
          type={config.type}
        />
      ))}
    </>
  );
};
