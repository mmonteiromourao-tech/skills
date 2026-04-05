import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle2, Clock, AlertCircle, PlusCircle } from "lucide-react";

const upcoming = [
  { title: "Post sobre produto novo", date: "Hoje, 14h00", status: "agendado", channel: "Instagram" },
  { title: "Story: bastidores", date: "Amanhã, 09h30", status: "rascunho", channel: "Instagram" },
  { title: "Artigo de blog — tendências", date: "Sex, 10h00", status: "agendado", channel: "Blog" },
  { title: "Newsletter mensal", date: "Dom, 08h00", status: "rascunho", channel: "Email" },
];

const statusConfig: Record<string, { label: string; className: string; icon: typeof CheckCircle2 }> = {
  agendado: { label: "Agendado", className: "text-emerald-400", icon: CheckCircle2 },
  rascunho: { label: "Rascunho", className: "text-amber-400", icon: AlertCircle },
};

export default function CalendarioPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="h-6 w-6 text-indigo-400" />
          <div>
            <h1 className="text-xl font-semibold text-zinc-100">Calendário de Conteúdo</h1>
            <p className="text-sm text-zinc-400">
              Planeje e agende publicações em todos os canais.
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-amber-500/15 text-amber-400 border-amber-500/20">
          Em desenvolvimento
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Agendados</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-zinc-100">8</p>
            <p className="mt-1 text-xs text-zinc-500">próximos 7 dias</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Rascunhos</CardTitle>
            <Clock className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-zinc-100">5</p>
            <p className="mt-1 text-xs text-zinc-500">aguardando revisão</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Publicados hoje</CardTitle>
            <PlusCircle className="h-4 w-4 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-zinc-100">2</p>
            <p className="mt-1 text-xs text-zinc-500">canais ativos</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-zinc-300">Próximas Publicações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-zinc-800">
            {upcoming.map((item, i) => {
              const cfg = statusConfig[item.status];
              const Icon = cfg.icon;
              return (
                <div key={i} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{item.title}</p>
                    <p className="text-xs text-zinc-500">{item.date} · {item.channel}</p>
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs font-medium ${cfg.className}`}>
                    <Icon className="h-3.5 w-3.5" />
                    {cfg.label}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
