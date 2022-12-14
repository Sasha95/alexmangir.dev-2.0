import { baseFetch } from 'pages/api/baseFetch';

type Props = {
  profile_image_url: string;
};

export async function getTwitterProfilePicture() {
  const queryParams = `user.fields=profile_image_url`;
  const response = await baseFetch<{}, Props>(
    `https://api.twitter.com/2/users/by/username/css_prime?${queryParams}`,
    {},
    'GET',
    `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
  );

  return response.result.profile_image_url;
}
