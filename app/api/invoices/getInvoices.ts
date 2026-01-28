import { LatestInvoice } from "@/app/lib/definitions";

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

  
  export default async function getInvoices() {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return mockLatestInvoices;
  }