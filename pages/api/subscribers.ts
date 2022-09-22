import { Subscribers } from '@/lib/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { baseFetch } from './baseFetch';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await baseFetch<{}, Subscribers>(
    'https://www.getrevue.co/api/v2/subscribers',
    {},
    'GET',
    `Token ${process.env.REVUE_API_KEY}`
  );

  if (!response.ok) {
    return res.status(500).json({ error: 'Error retrieving subscribers' });
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  );

  return res.status(200).json({ count: response.result.count });
}
