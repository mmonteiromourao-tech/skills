import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, TrendingDown, Minus, Search } from "lucide-react";

const competitors = [
  { name: "Concorrente Alpha", followers: "45.2K", growth: "+3.1%", trend: "up", posts: 14 },
  { name: "Concorrente Beta", followers: "28.8K", growth: "-0.7%", trend: "down", posts: 9 },
  { name: "Concorrente Gamma", followers: "61.0K", growth: "+1.4%", trend: "up", posts: 21 },
  { name: "Concorrente Delta", followers: "19.3K", growth: "0.0%", trend: "flat", posts: 6 },
];

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-emerald-400" />;
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-400" />;
  return <Minus className="h-4 w-4 text-zinc-400" />;
};

export default function ConcorrentesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-indigo-400" />
          <div>
            <h1 className="text-xl font-semibold text-zinc-100">Rastreador de Concorrentes</h1>
            <p className="text-sm text-zinc-400">
              Monitore métricas e estratégias dos seus concorrentes.
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-amber-500/15 text-amber-400 border-amber-500/20">
          Em desenvolvimento
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Concorrentes rastreados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-zinc-100">4</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Média de crescimento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-zinc-100">+1.0%</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Alertas ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-zinc-100">2</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-zinc-300">Visão Geral dos Concorrentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-zinc-800">
            {competitors.map((c) => (
              <div key={c.name} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-zinc-300">
                    {c.name.split(" ")[1][0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{c.name}</p>
                    <p className="text-xs text-zinc-500">{c.followers} seguidores · {c.posts} posts/mês</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${c.trend === "up" ? "text-emerald-400" : c.trend === "down" ? "text-red-400" : "text-zinc-400"}`}>
                    {c.growth}
                  </span>
                  <TrendIcon trend={c.trend} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-zinc-300">Análise Detalhada</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-10 text-zinc-500">
            <Search className="mb-3 h-8 w-8 opacity-40" />
            <p className="text-sm">Análise comparativa detalhada em breve</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
