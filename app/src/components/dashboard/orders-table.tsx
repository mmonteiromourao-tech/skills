import { recentOrders, type OrderStatus } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, type badgeVariants } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type VariantProps } from "class-variance-authority";

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

const statusMap: Record<OrderStatus, { label: string; variant: BadgeVariant }> = {
  completed: { label: "Concluído", variant: "default" },
  processing: { label: "Em andamento", variant: "secondary" },
  pending: { label: "Pendente", variant: "outline" },
  cancelled: { label: "Cancelado", variant: "destructive" },
};

export function OrdersTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos Recentes</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => {
              const { label, variant } = statusMap[order.status];
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-muted-foreground">
                    {order.id}
                  </TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {order.product}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {order.date}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {order.amount}
                  </TableCell>
                  <TableCell>
                    <Badge variant={variant}>{label}</Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
