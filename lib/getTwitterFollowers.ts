import { baseFetch } from 'pages/api/baseFetch';

type SocialTwitterProps = {
  meta?: {
    result_count: number;
    next_token: string;
  };
};

export async function getTwitterFollowers() {
  let followerCount = 0;
  let response = await baseFetch<{}, SocialTwitterProps>(
    'https://api.twitter.com/2/users/2568921814/followers?max_results=1000',
    {},
    'GET',
    `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
  );

  followerCount += response.result.meta?.result_count;

  while (response.result.meta?.next_token) {
    response = await baseFetch<{}, SocialTwitterProps>(
      `https://api.twitter.com/2/users/2568921814/followers?max_results=1000&pagination_token=${response.result.meta.next_token}`,
      {},
      'GET',
      `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
    );
    followerCount += response.result.meta?.result_count;
  }

  return { followers: followerCount };
}
