import { OrderList } from '../../Components/OrderList';
import { OverviewPanel } from '../../Components/OverviewPanel';
import {
  useBusinessOverview,
  useRecentOrders,
} from '../../hooks/useBusinessMetrics';

export function Dashboard() {
  const { data: recentOrders, isLoading: recentOrdersLoading } =
    useRecentOrders();
  const { data: overview, isLoading: overviewLoading } = useBusinessOverview();

  return (
    <section className='space-y-3'>
      <OverviewPanel overview={overview} loading={overviewLoading} />
      <OrderList orders={recentOrders} loading={recentOrdersLoading} />;
    </section>
  );
}
