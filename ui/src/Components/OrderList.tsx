import { Order } from '../types';
import { ParagraphSkeleton } from './Loader';
import { OrderListItem } from './OrderListItem';

export function OrderList({
  orders,
  loading,
}: {
  orders?: Order[];
  loading: boolean;
}) {
  return (
    <article className='rounded-xl border border-gray-100 shadow-sm bg-gray-50 p-4'>
      <div className='flex flex-col items-center'>
        <h3 className='text-xl font-medium '>Recent Orders</h3>
        <ul className='mt-4 w-2/3 space-y-2'>
          {loading && [1, 2, 3, 4].map((i) => <ParagraphSkeleton key={i} />)}
          {orders?.map((order, i) => (
            <OrderListItem key={i} order={order} />
          ))}
        </ul>
      </div>
    </article>
  );
}
