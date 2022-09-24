import { baseFetch } from 'pages/api/baseFetch';
import { SocialFollowers } from './types';

export async function getGitHubFollowers() {
  const user = await baseFetch<{}, SocialFollowers>(
    'https://api.github.com/users/Sasha95',
    {}
  );

  return { followers: user.result.followers };
}
