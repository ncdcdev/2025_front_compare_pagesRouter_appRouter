import DashboardSkeleton from "@/app/ui/skeletons";

export default function Loading() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-[1800px] mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-blue-500">
              <DashboardSkeleton />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-orange-500">
              <DashboardSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

