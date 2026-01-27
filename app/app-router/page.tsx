import AppRouterDashboard from "@/app/ui/dashboard/app-router-dashboard";
import { Suspense } from "react";
import DashboardSkeleton from "@/app/ui/skeletons";

export default function AppRouterPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-6 pb-4 border-b">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            App Router Dashboard
          </h1>
          <p className="text-gray-600">
            Next.js 14+ のApp Routerを使用したダッシュボード
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Server Components + Suspense + Streaming
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Suspense fallback={<DashboardSkeleton />}>
            <AppRouterDashboard />
          </Suspense>
        </div>
      </div>
    </div>
  );
}


