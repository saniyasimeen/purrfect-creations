import { Order } from '../types';
import { StatusBadge } from './StatusBadge';

export function OrderListItem({ order }: { order: Order }) {
  return (
    <li className='rounded-lg border border-gray-100 shadow-sm p-4 hover:border-teal-600'>
      <div className='flex justify-between'>
        <div className='flex flex-col items-start space-y-1'>
          <strong className='font-medium'>Order #{order.order_id}</strong>
          <p className=''>Product: {order.product_name}</p>
          <p className=''>Email: {order.email}</p>
        </div>

        <div className='flex flex-col items-end space-y-1'>
          <StatusBadge status={order.order_status} />
          <p className='text-sm font-medium'>${order.price}</p>
          <p className=''> {order.order_placed}</p>
        </div>
      </div>
    </li>
  );
}
