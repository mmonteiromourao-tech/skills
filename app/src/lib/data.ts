import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export type KpiItem = {
  title: string;
  value: string;
  delta: string;
  deltaLabel: string;
  Icon: LucideIcon;
};

export const kpiData: KpiItem[] = [
  {
    title: "Total Revenue",
    value: "R$ 45.231",
    delta: "+20,1%",
    deltaLabel: "em relação ao mês passado",
    Icon: DollarSign,
  },
  {
    title: "Pedidos",
    value: "2.350",
    delta: "+180,1%",
    deltaLabel: "em relação ao mês passado",
    Icon: ShoppingCart,
  },
  {
    title: "Clientes",
    value: "12.234",
    delta: "+19%",
    deltaLabel: "em relação ao mês passado",
    Icon: Users,
  },
  {
    title: "Crescimento",
    value: "+573",
    delta: "+201",
    deltaLabel: "novos usuários desde ontem",
    Icon: TrendingUp,
  },
];

export type OrderStatus = "completed" | "pending" | "processing" | "cancelled";

export type Order = {
  id: string;
  customer: string;
  product: string;
  date: string;
  amount: string;
  status: OrderStatus;
};

export const recentOrders: Order[] = [
  {
    id: "#3210",
    customer: "Ana Lima",
    product: "Notebook Pro 15",
    date: "25 Mar 2026",
    amount: "R$ 4.299,00",
    status: "completed",
  },
  {
    id: "#3209",
    customer: "Carlos Souza",
    product: "Monitor 4K 27\"",
    date: "25 Mar 2026",
    amount: "R$ 1.850,00",
    status: "processing",
  },
  {
    id: "#3208",
    customer: "Beatriz Costa",
    product: "Teclado Mecânico",
    date: "24 Mar 2026",
    amount: "R$ 389,00",
    status: "pending",
  },
  {
    id: "#3207",
    customer: "Diego Ferreira",
    product: "Headset Gamer",
    date: "24 Mar 2026",
    amount: "R$ 259,00",
    status: "completed",
  },
  {
    id: "#3206",
    customer: "Fernanda Alves",
    product: "Webcam HD",
    date: "23 Mar 2026",
    amount: "R$ 199,00",
    status: "cancelled",
  },
  {
    id: "#3205",
    customer: "Gabriel Martins",
    product: "Mouse Sem Fio",
    date: "23 Mar 2026",
    amount: "R$ 149,00",
    status: "completed",
  },
  {
    id: "#3204",
    customer: "Helena Rocha",
    product: "Hub USB-C",
    date: "22 Mar 2026",
    amount: "R$ 219,00",
    status: "processing",
  },
  {
    id: "#3203",
    customer: "Igor Santos",
    product: "SSD 1TB",
    date: "22 Mar 2026",
    amount: "R$ 499,00",
    status: "completed",
  },
];
