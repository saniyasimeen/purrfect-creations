import * as data from './data.json';

const today = new Date();
const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth());

const res = data.reduce(
  (acc, record) => {
    acc.revenue += record.price;

    if (record.order_status === 'in_progress') acc.inProgress += 1;

    if (new Date(record.order_placed) >= firstDayOfCurrentMonth)
      acc.ordersThisMonth += 1;

    return acc;
  },
  { revenue: 0, inProgress: 0, ordersThisMonth: 0, totalOrders: data.length },
);

('2024-10-03');
// new Date("2021-09-18")

const x = new Date('2023-01-02'); //?
console.log('x:', x >= firstDayOfCurrentMonth);
