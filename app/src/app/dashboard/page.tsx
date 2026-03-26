import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { OrdersTable } from "@/components/dashboard/orders-table";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Bem-vindo de volta! Aqui está o resumo de hoje.
        </p>
      </div>
      <KpiGrid />
      <OrdersTable />
    </div>
  );
}
