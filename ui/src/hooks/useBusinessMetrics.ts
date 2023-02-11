import { useQuery } from 'react-query';
import { Order, OverviewDto } from '../types';
import { useHttpClient } from './useHttpClient';

export function useRecentOrders() {
  const httpClient = useHttpClient();
  return useQuery(['recent-orders'], async () => {
    const { data } = await httpClient.get<Order[]>(
      'business-metrics/recent-orders'
    );
    return data;
  });
}
export function useBusinessOverview() {
  const httpClient = useHttpClient();
  return useQuery(['business-overview'], async () => {
    const { data } = await httpClient.get<OverviewDto>('business-metrics');
    return data;
  });
}
