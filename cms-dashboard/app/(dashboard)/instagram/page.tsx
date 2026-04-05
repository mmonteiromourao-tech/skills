import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Heart, MessageCircle, Users, TrendingUp } from "lucide-react";

const metrics = [
  {
    title: "Seguidores",
    value: "12.4K",
    delta: "+2.1%",
    icon: Users,
  },
  {
    title: "Curtidas (30 dias)",
    value: "8.920",
    delta: "+14.3%",
    icon: Heart,
  },
  {
    title: "Comentários (30 dias)",
    value: "1.247",
    delta: "+5.8%",
    icon: MessageCircle,
  },
  {
    title: "Taxa de Engajamento",
    value: "4.2%",
    delta: "+0.3%",
    icon: TrendingUp,
  },
];

export default function InstagramPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Camera className="h-6 w-6 text-indigo-400" />
          <div>
            <h1 className="text-xl font-semibold text-zinc-100">
              Gestor de Instagram
            </h1>
            <p className="text-sm text-zinc-400">
              Gerencie publicações, métricas e engajamento da sua conta.
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-amber-500/15 text-amber-400 border-amber-500/20">
          Em desenvolvimento
        </Badge>
      </div>

      {/* Metrics Grid */}
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

      {/* Placeholder sections */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-zinc-300">
              Publicações Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-10 text-zinc-500">
              <Camera className="mb-3 h-8 w-8 opacity-40" />
              <p className="text-sm">Feed de publicações em breve</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-zinc-300">
              Agendamento de Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-10 text-zinc-500">
              <TrendingUp className="mb-3 h-8 w-8 opacity-40" />
              <p className="text-sm">Agendador de conteúdo em breve</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
