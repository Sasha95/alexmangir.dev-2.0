import siteMetadata from '@/data/siteMetadata';
import { ButtonType } from '@/lib/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { Button } from './Button';

type Props = {
  supabase: SupabaseClient;
};

export function AuthButton({ supabase }: Props) {
  function handleGitHubLogin() {
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${siteMetadata.siteUrl}/community-wall`
      }
    });
  }
  return (
    <div>
      <Button buttonType={ButtonType.PRIMARY} onButtonClick={handleGitHubLogin}>
        Log in
      </Button>
    </div>
  );
}
