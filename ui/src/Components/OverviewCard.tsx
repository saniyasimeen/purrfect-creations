export function OverviewCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className='flex flex-col rounded-lg border border-teal-100 px-4 py-8 text-center'>
      <dt className='order-last text-lg font-medium text-gray-500'>{title}</dt>

      <dd className='text-4xl font-extrabold text-teal-600 md:text-5xl'>
        {value}
      </dd>
    </div>
  );
}
