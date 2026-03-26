import { kpiData } from "@/lib/data";
import { KpiCard } from "@/components/dashboard/kpi-card";

export function KpiGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpiData.map((item) => (
        <KpiCard key={item.title} {...item} />
      ))}
    </div>
  );
}
