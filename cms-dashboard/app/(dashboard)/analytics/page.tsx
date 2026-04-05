import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Eye, MousePointerClick, Clock, TrendingUp } from "lucide-react";

const metrics = [
  { title: "Visualizações (30 dias)", value: "54.2K", delta: "+8.7%", icon: Eye },
  { title: "Cliques", value: "3.810", delta: "+12.4%", icon: MousePointerClick },
  { title: "Tempo Médio na Página", value: "2m 34s", delta: "+0:12s", icon: Clock },
  { title: "Taxa de Crescimento", value: "11.3%", delta: "+1.2%", icon: TrendingUp },
];

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-indigo-400" />
          <div>
            <h1 className="text-xl font-semibold text-zinc-100">Analytics</h1>
            <p className="text-sm text-zinc-400">
              Acompanhe o desempenho do seu conteúdo em todos os canais.
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-amber-500/15 text-amber-400 border-amber-500/20">
          Em desenvolvimento
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} className="bg-zinc-900 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">
                  {metric.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-zinc-500" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-zinc-100">{metric.value}</p>
                <p className="mt-1 text-xs text-emerald-400">{metric.delta} este mês</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="bg-zinc-900 border-zinc-800 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-zinc-300">
              Gráfico de Desempenho
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-16 text-zinc-500">
              <BarChart3 className="mb-3 h-10 w-10 opacity-40" />
              <p className="text-sm">Visualizações e engajamento em breve</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
