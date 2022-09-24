import type { NextApiRequest, NextApiResponse } from 'next';
import { baseFetch } from './baseFetch';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await baseFetch<{}, unknown[]>(
    'https://www.getrevue.co/api/v2/issues',
    {},
    'GET',
    `Token ${process.env.REVUE_API_KEY}`
  );

  if (!response.ok) {
    return res
      .status(500)
      .json({ error: 'Error retrieving newsletter issues' });
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  );

  return res.status(200).json({ count: response.result.length });
}
