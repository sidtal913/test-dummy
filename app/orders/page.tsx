import type { Metadata } from 'next';
import { OrdersPage } from '@/components/OrdersPage';

export const metadata: Metadata = {
  title: 'Order brownies | Brownies Factory',
  description: 'Browse the factory menu and build your brownie order.',
};

export default function OrdersRoutePage() {
  return <OrdersPage />;
}
