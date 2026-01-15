const mockLatestInvoices = [
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
    image_url: "/customers/hector-simpson.png",
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

export async function GET() {
  // 意図的に遅延を追加（比較用）
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return Response.json(mockLatestInvoices);
}
