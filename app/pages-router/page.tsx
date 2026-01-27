import PagesRouterDashboard from "@/app/ui/dashboard/pages-router-dashboard";

// 動的レンダリングを強制（APIルートを使用するため）
export const dynamic = 'force-dynamic';

export default function PagesRouterPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-6 pb-4 border-b">
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            Pages Router Dashboard
          </h1>
          <p className="text-gray-600">
            従来のPages Routerを使用したダッシュボード
          </p>
          <p className="text-sm text-gray-500 mt-2">
            getServerSideProps + ブロッキングレンダリング
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <PagesRouterDashboard />
        </div>
      </div>
    </div>
  );
}


