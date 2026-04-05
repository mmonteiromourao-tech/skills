import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, Rss, Clock, Tag } from "lucide-react";

const articles = [
  {
    title: "Tendências de marketing digital para 2026",
    source: "Marketing Today",
    time: "2h atrás",
    tags: ["Marketing", "Tendências"],
  },
  {
    title: "Como o algoritmo do Instagram mudou este trimestre",
    source: "Social Media Week",
    time: "5h atrás",
    tags: ["Instagram", "Algoritmo"],
  },
  {
    title: "Estratégias de conteúdo que mais geram engajamento",
    source: "Content Hub",
    time: "1d atrás",
    tags: ["Conteúdo", "Engajamento"],
  },
  {
    title: "SEO em 2026: o que mudou e o que ficou",
    source: "Search Engine Journal",
    time: "2d atrás",
    tags: ["SEO", "Tendências"],
  },
];

export default function NoticiasPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Newspaper className="h-6 w-6 text-indigo-400" />
          <div>
            <h1 className="text-xl font-semibold text-zinc-100">Consolidador de Notícias</h1>
            <p className="text-sm text-zinc-400">
              Agregue e filtre notícias relevantes do seu setor.
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
            <CardTitle className="text-sm font-medium text-zinc-400">Fontes ativas</CardTitle>
            <Rss className="h-4 w-4 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-zinc-100">12</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Artigos hoje</CardTitle>
            <Newspaper className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-zinc-100">34</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Salvos</CardTitle>
            <Tag className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-zinc-100">7</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-zinc-300">Artigos Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-zinc-800">
            {articles.map((article, i) => (
              <div key={i} className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-200 leading-snug">
                      {article.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                      <span>{article.source}</span>
                      <span>·</span>
                      <Clock className="h-3 w-3" />
                      <span>{article.time}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-zinc-800 px-2 py-0.5 text-[11px] text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
