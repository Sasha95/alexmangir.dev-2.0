import { ClapCount } from '@/components/stats/ClapCount';
import { LikeCount } from '@/components/stats/LikeCount';
import { LoveCount } from '@/components/stats/LoveCount';
import { NewsletterSubs } from '@/components/stats/Newslettersubs';
import { PageViews } from '@/components/stats/Pageviews';
import { PartyCount } from '@/components/stats/PartyCount';
import { SponsoredArticles } from '@/components/stats/SponsoredArticles';
import { TotalArticles } from '@/components/stats/TotalArticles';
import { TotalReactions } from '@/components/stats/TotalReactions';
import { Visitors } from '@/components/stats/Visitors';
import { fetcher } from '@/lib/fetcher';
import { Reactions } from '@/lib/types';
import { Container } from 'layouts/Container';
import useSWR from 'swr';

export default function Stats() {
  const { data: totalReactions } = useSWR<Reactions>(
    '/api/statistics/total-reactions',
    fetcher
  );

  return (
    <Container title="Stats - Alexandr Mangir">
      <h1>
        <span className="block text-base font-semibold tracking-wide text-center text-teal-500 uppercase dark:text-teal-400">
          Stats
        </span>
        <span className="block max-w-2xl mx-auto mt-2 text-4xl font-bold leading-10 text-center sm:text-5xl">
          Interested in numbers? I've got you covered.
        </span>
      </h1>
      <div className="grid grid-cols-4 gap-2 md:gap-6">
        <div className="col-span-4">
          <h2 className="flex items-center mb-0 text-base uppercase">
            Site Stats{' '}
            <span className="ml-4 text-xs text-gray-400 dark:text-gray-600">
              (updated every 60 seconds)
            </span>
          </h2>
        </div>
        <Visitors />
        <PageViews />
        <NewsletterSubs />
      </div>

      <div className="grid grid-cols-4 gap-2 md:gap-6">
        <div className="col-span-4">
          <h2 className="flex items-center mb-0 text-base uppercase">
            Article Stats{' '}
            <span className="ml-4 text-xs text-gray-400 dark:text-gray-600">
              (updated every 60 seconds)
            </span>
          </h2>
        </div>
        <TotalArticles />
        <SponsoredArticles />
        <LikeCount likeCount={totalReactions?.like_count} />
        <LoveCount loveCount={totalReactions?.love_count} />
        <ClapCount clapCount={totalReactions?.clap_count} />
        <PartyCount partyCount={totalReactions?.party_count} />
        <TotalReactions />
      </div>
    </Container>
  );
}
