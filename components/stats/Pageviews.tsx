import { fetcher } from '@/lib/fetcher';
import { internationalNumberFormat } from '@/lib/formatNumbers';
import useSWR from 'swr';

export function PageViews() {
  const { data: totalPageViews } = useSWR<{ pageviews: number }>(
    '/api/statistics/total-pageviews',
    fetcher
  );

  return (
    <div className="h-32 justify-center text-center bg-gray-100 dark:bg-midnight rounded-lg p-6 flex flex-col items-center col-span-2">
      <h2 className="text-3xl font-bold m-0">
        {totalPageViews
          ? internationalNumberFormat.format(totalPageViews?.pageviews)
          : '--'}
      </h2>
      <p className="text-base m-0">Total page views</p>
    </div>
  );
}
