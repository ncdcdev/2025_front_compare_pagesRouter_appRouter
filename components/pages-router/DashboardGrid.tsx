import { ReactNode } from "react";

interface DashboardGridProps {
  children: ReactNode;
}

export const DashboardGrid = ({ children }: DashboardGridProps) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {children}
    </div>
  );
};

interface ChartContainerProps {
  children: ReactNode;
}

export const ChartContainer = ({ children }: ChartContainerProps) => {
  return <div className="col-span-2">{children}</div>;
};
