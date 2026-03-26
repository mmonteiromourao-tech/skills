import { type LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";

type KpiCardProps = {
  title: string;
  value: string;
  delta: string;
  deltaLabel: string;
  Icon: LucideIcon;
};

export function KpiCard({ title, value, delta, deltaLabel, Icon }: KpiCardProps) {
  const isPositive = delta.startsWith("+");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <CardAction>
          <div className="flex size-9 items-center justify-center rounded-full bg-muted">
            <Icon className="size-4 text-muted-foreground" />
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-2xl font-bold">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          <span className={isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
            {delta}
          </span>{" "}
          {deltaLabel}
        </p>
      </CardContent>
    </Card>
  );
}
