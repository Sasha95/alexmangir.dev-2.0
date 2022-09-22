import type { NextApiRequest, NextApiResponse } from 'next';

import { supabaseClient } from '@/lib/hooks/useSupabase';
import { Reactions } from '@/lib/types';

export async function getTotalReactions() {
  return await supabaseClient
    .from('reactions')
    .select<string, Reactions>(
      'like_count, love_count, clap_count, party_count'
    );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let likeCount = 0,
    loveCount = 0,
    clapCount = 0,
    partyCount = 0,
    totalReactions = 0;

  const { data } = await getTotalReactions();

  data?.forEach((item) => {
    likeCount += item.like_count;
    loveCount += item.love_count;
    clapCount += item.clap_count;
    partyCount += item.party_count;
    totalReactions +=
      item.like_count + item.love_count + item.clap_count + item.party_count;
  });

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=60'
  );

  return res.status(200).json({
    likeCount,
    loveCount,
    clapCount,
    partyCount,
    totalReactions
  });
}
