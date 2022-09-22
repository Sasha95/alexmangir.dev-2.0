import { fetcher } from '@/lib/fetcher';
import { Views } from '@/lib/types';
import useSWR from 'swr';

type Props = {
  slug: string;
};

const PageViews = ({ slug }: Props) => {
  const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher, {
    refreshInterval: 5000
  });

  const views = new Number(data?.total);

  return <span>{`${views > 0 ? views.toLocaleString() : '–––'} views`}</span>;
};

export default PageViews;
