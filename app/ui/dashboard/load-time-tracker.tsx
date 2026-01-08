"use client";

interface LoadTimeTrackerProps {
  sectionName: string;
  loadTime: number;
}

export function LoadTimeTracker({
  sectionName,
  loadTime,
}: LoadTimeTrackerProps) {
  return (
    <div className="mb-2 flex items-center gap-1.5 rounded-md bg-green-50 px-2 py-0.5 text-xs">
      <span className="font-medium text-green-700">
        ✅ {sectionName} 取得完了
      </span>
      <span className="text-green-600">({loadTime}ms)</span>
    </div>
  );
}
