import { OverviewDto } from '../types';
import { ParagraphSkeleton } from './Loader';
import { OverviewCard } from './OverviewCard';

export function OverviewPanel({
  overview,
  loading,
}: {
  overview?: OverviewDto;
  loading: boolean;
}) {
  return (
    <section className='bg-white'>
      <div className='mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8'>
        <div className='mt-8 sm:mt-12'>
          {loading && (
            <div className='grid grid-cols-4 gap-4'>
              {[1, 2, 3, 4].map((i) => (
                <ParagraphSkeleton key={i} />
              ))}
            </div>
          )}{' '}
          {overview && (
            <dl className='grid grid-cols-1 gap-4 sm:grid-cols-4'>
              <OverviewCard
                title='Total Orders'
                value={overview.totalOrders}
                key={1}
              />
              <OverviewCard
                title='Orders In Progress'
                value={overview.inProgress}
                key={2}
              />
              <OverviewCard
                title='Orders This Month'
                value={overview.ordersThisMonth}
                key={3}
              />
              <OverviewCard
                title='Total Revenue'
                value={`$${overview.revenue.toFixed(0)}`}
                key={4}
              />
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}
