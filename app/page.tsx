import ComparePage from "./compare/page";

// 動的レンダリングを強制（APIルートを使用するため）
export const dynamic = 'force-dynamic';

export default function Page() {
  return <ComparePage />;
}
