import { DISPLAY } from "@/constants/dashboard";

interface LoadStatusBadgeProps {
  loadTime: number;
}

export const LoadStatusBadge = ({ loadTime }: LoadStatusBadgeProps) => {
  const formattedTime =
    typeof loadTime === "number"
      ? loadTime.toFixed(DISPLAY.LOAD_TIME_DECIMALS)
      : "0";

  return (
    <div className="mb-2 flex items-center gap-1.5 rounded-md bg-green-50 text-green-700 px-2 py-0.5 text-xs">
      ✅ 全データ 取得完了 ({formattedTime}ms)
    </div>
  );
};
